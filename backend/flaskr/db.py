import sqlite3
from flask import current_app, g, jsonify
import click
# Connect to the SQLite database
def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(
            current_app.config['DATABASE'],
            detect_types=sqlite3.PARSE_DECLTYPES
        )
        g.db.row_factory = sqlite3.Row

    return g.db

# Close the database connection
def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()

# Initialize the database
def init_db():
    db = get_db()

    with current_app.open_resource('schema.sql') as f:
        db.executescript(f.read().decode('utf8'))

# Fill the database with mock data
def populate_mock():
    db = get_db()
    with current_app.open_resource('mock.sql') as f:
        db.executescript(f.read().decode('utf8'))
    db.commit()

# CLI command to initialize the database
@click.command('init-db')
def init_db_command():
    """Clear the existing data and create new tables."""
    init_db()
    click.echo('Initialized the database.')
    populate_mock()
    click.echo('Populated the database with mock data.')

# Register the database functions with the application
def init_app(app):
    app.teardown_appcontext(close_db)  # Ensure the connection is closed when the app context ends
    app.cli.add_command(init_db_command)  # Add the init-db command to the CLI

# STEP 1: Add a new experiment
def add_experiment(db):
    db.execute(
        'INSERT INTO experiment DEFAULT VALUES'
    )
    db.commit()

# STEP 2: Define the attribute for each level of this experiment
def add_attribute(db, name, type, table, experiment_id):
    db.execute(
        f'INSERT INTO {table} (name, type, experiment_id) VALUES (?, ?, ?)',
        (name, type, experiment_id)
    )
    db.commit()

# STEP 3: Add a new item in one level of an experiment
# Add a new subject in an experiment
def add_subject(db, experiment_id):
    db.execute(
        'INSERT INTO subject (experiment_id) VALUES (?)',
        (experiment_id,)
    )
    db.commit()

# Add a new sample in an experiment
def add_sample(db, experiment_id, subject_id):
    db.execute(
        'INSERT INTO sample (experiment_id, subject_id) VALUES (?, ?)',
        (experiment_id, subject_id)
    )
    db.commit()

# Add a new observation in a sample
def add_observation(db, sample_id):
    db.execute(
        'INSERT INTO observation (sample_id) VALUES (?)',
        (sample_id,)
    )
    db.commit()

# STEP 4: Add an attribute value for a given table
def add_value(db, value, attribute_id, table):
    db.execute(
        f'INSERT INTO {table} (value, attribute_id) VALUES (?, ?)',
        (value, attribute_id)
    )
    db.commit()

# Delete an item
def delete_item(db, table, id):
    query = f'DELETE FROM {table} WHERE id = ?'  # Using f-string to safely insert table name
    db.execute(query, (id,))
    db.commit()

# update an item
def update_item(table, id, field, value):
    db = get_db()
    query = f'UPDATE {table} SET {field} = ? WHERE id = ?'  # Using f-string to safely insert table name
    db.execute(query, (value, id,))
    db.commit()

# convert the SQLite to jsonable format
def make_dicts(cursor, row):
    return dict((cursor.description[idx][0], value)
                for idx, value in enumerate(row))

# query the database
def query_db(query, args=(), one=False):
    cur = get_db().execute(query, args)
    rv = cur.fetchall()
    cur.close()
    return (rv[0] if rv else None) if one else rv

# STEP 5: Retrieve the data from the database
# Retrieve all experiments (! only with predefined attributes)
def get_experiments():
    db = get_db()
    db.row_factory = make_dicts  # Ensure the data is converted to dictionaries when queried

    # Fetch the distinct attribute names for non-custom experiments
    attribute_names = db.execute(
        '''
        SELECT DISTINCT name
        FROM experiment_attributes
        WHERE custom = 0
        '''
    ).fetchall()

    # Generate the pivot query
    columns = ["e.experiment_id AS experiment_id"]
    for attribute in attribute_names:
        attribute_name = attribute['name']
        # Use double quotes to handle attribute names with spaces or special characters
        columns.append(f"MAX(CASE WHEN ea.name = '{attribute_name}' THEN av.value END) AS \"{attribute_name}\"")

    columns_str = ", ".join(columns)
    pivot_query = f"""
    SELECT {columns_str}
    FROM experiment e
    LEFT JOIN experiment_attributes ea ON e.experiment_id = ea.experiment_id
    LEFT JOIN experiment_attribute_values av ON ea.experiment_attributes_id = av.attribute_id
    GROUP BY e.experiment_id
    """

    rows = db.execute(pivot_query).fetchall()
    return jsonify(rows)

# Retrieve all samples from an experiment (all attributes + values)
def get_samples(experiment_id):
    db = get_db()
    db.row_factory = make_dicts  # Ensure the data is converted to dictionaries when queried

    # Fetch the distinct attribute names for non-custom samples
    attribute_names = db.execute(
        '''
        SELECT DISTINCT name
        FROM sample_attributes
        WHERE experiment_id = ?
        ''', (experiment_id,)
    ).fetchall()

    # Generate the pivot query
    columns = ["s.sample_id AS sample_id"]
    for attribute in attribute_names:
        attribute_name = attribute['name']
        columns.append(f"MAX(CASE WHEN sa.name = '{attribute_name}' THEN sav.value END) AS \"{attribute_name}\"")

    columns_str = ", ".join(columns)
    pivot_query = f"""
    SELECT {columns_str}
    FROM sample s
    LEFT JOIN sample_attributes sa ON s.experiment_id = sa.experiment_id
    LEFT JOIN sample_attribute_values sav ON sa.sample_attributes_id = sav.attribute_id
    WHERE s.experiment_id = ?
    GROUP BY s.sample_id
    """

    rows = db.execute(pivot_query, (experiment_id,)).fetchall()
    return jsonify(rows)

# Retrieve all observations from a sample with pivoted attributes
def get_observations(sample_id):
    db = get_db()
    db.row_factory = make_dicts  # Ensure the data is converted to dictionaries when queried

    # Fetch the distinct attribute names for non-custom observations
    attribute_names = db.execute(
        '''
        SELECT DISTINCT name
        FROM observation_attributes
        WHERE experiment_id = (SELECT experiment_id FROM sample WHERE sample_id = ?)
        ''', (sample_id,)
    ).fetchall()

    # Generate the pivot query
    columns = ["o.observation_id AS observation_id"]
    for attribute in attribute_names:
        attribute_name = attribute['name']
        columns.append(f"MAX(CASE WHEN oa.name = '{attribute_name}' THEN oav.value END) AS \"{attribute_name}\"")

    columns_str = ", ".join(columns)
    pivot_query = f"""
    SELECT {columns_str}
    FROM observation o
    LEFT JOIN observation_attributes oa ON o.sample_id = oa.experiment_id
    LEFT JOIN observation_attribute_values oav ON oa.observation_attributes_id = oav.attribute_id
    WHERE o.sample_id = ?
    GROUP BY o.observation_id
    """

    rows = db.execute(pivot_query, (sample_id,)).fetchall()
    return jsonify(rows)

# Retrieve all subjects from an experiment with pivoted attributes
def get_subjects(experiment_id):
    db = get_db()
    db.row_factory = make_dicts  # Ensure the data is converted to dictionaries when queried

    # Fetch the distinct attribute names for non-custom subjects
    attribute_names = db.execute(
        '''
        SELECT DISTINCT name
        FROM subject_attributes
        WHERE AND experiment_id = ?
        ''', (experiment_id,)
    ).fetchall()

    # Generate the pivot query
    columns = ["s.subject_id AS subject_id"]
    for attribute in attribute_names:
        attribute_name = attribute['name']
        columns.append(f"MAX(CASE WHEN sa.name = '{attribute_name}' THEN sav.value END) AS \"{attribute_name}\"")

    columns_str = ", ".join(columns)
    pivot_query = f"""
    SELECT {columns_str}
    FROM subject s
    LEFT JOIN subject_attributes sa ON s.experiment_id = sa.experiment_id
    LEFT JOIN subject_attribute_values sav ON sa.subject_attributes_id = sav.attribute_id
    WHERE s.experiment_id = ?
    GROUP BY s.subject_id
    """

    rows = db.execute(pivot_query, (experiment_id,)).fetchall()
    return jsonify(rows)

# Retrieve the attributes description for a level
def get_attributes(table_name, experiment_id):
    db = get_db()
    db.row_factory = make_dicts  # Ensure the data is converted to dictionaries when queried
    rows = db.execute(f'SELECT * FROM {table_name} WHERE experiment_id = ?', (experiment_id,)).fetchall()
    return rows

def get_columns(table_name):
    db = get_db()
    db.row_factory = make_dicts  # Ensure the data is converted to dictionaries when queried
    rows = db.execute(f'PRAGMA table_info({table_name})').fetchall()
    return rows

def get_attributes_predetermined(table_name):
    db = get_db()
    db.row_factory = make_dicts  # Ensure the data is converted to dictionaries when queried
    rows = db.execute(f'SELECT * FROM {table_name} WHERE custom = 0 AND experiment_id = 1').fetchall()
    return rows

# Get column names of a table
def get_column_names(table_name):
    db = get_db()
    db.row_factory = make_dicts  # Ensure the data is converted to dictionaries when queried
    columns_info = db.execute(f'PRAGMA table_info({table_name})').fetchall()
    column_names = [column['name'] for column in columns_info]
    return column_names