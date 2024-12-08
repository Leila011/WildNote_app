import os
import sqlite3
from flask import current_app, g, json, jsonify
import click

############################### UTILS ###############################
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

############################### WRITE ###############################
def add_experiment(con):
    """Add a new experiment to the database

    Returns: The ID of the newly created experiment
    """
    try:
        cursor = con.cursor()
        cursor.execute(
            'INSERT INTO experiment DEFAULT VALUES'
        )
        con.commit()
        return cursor.lastrowid
    except sqlite3.Error as e:
        raise Exception(f"Error adding experiment: {e}")

def add_attribute(con, attribute, table_name, experiment_id):
    """Add a new attribute to a given table
    
        Returns: The ID of the newly created experiment
    """
    print(attribute['name'])
    try:
        cursor = con.cursor()
        query = f'INSERT INTO {table_name} (name, label, type, custom, autofill, required, min, max, choices, default_value, experiment_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
        params = (
            attribute['name'],
            attribute['label'],
            attribute['type'],
            attribute['custom'],
            attribute['autofill'],
            attribute['required'],
            attribute['min'],
            attribute['max'],
            attribute['choices'],
            attribute['default_value'],
            experiment_id
        )

        cursor.execute(query, params)
        con.commit()
        return cursor.lastrowid
    except sqlite3.Error as e:
        raise Exception(f"Error adding attribute: {e}")


# def add_predefined_attributes(con, table_name, experiment_id):
#     """Add predefined attributes from a JSON file to a given attribute table"""

#     try:
#         cursor = con.cursor()
#         with open('predefined_attributes.json') as f:
#             data = json.load(f)
#             for attribute in data.get(f'{table_name}_attributes', []):
#                 cursor.execute(
#                     f'INSERT INTO {table_name+"_attributes"} (name, type, custom, experiment_id) VALUES (?, ?, ?, ?)',
#                     (attribute['name'], attribute['type'], attribute['custom'], attribute['autofill'], experiment_id)
#                 )
#     except sqlite3.Error as e:
#         raise Exception(f"Error adding predefined attributes: {e}")

def add_subject(con, experiment_id):
    """Add a new subject in the subject table"""
    try:
        cursor = con.cursor()
        cursor.execute(
            'INSERT INTO subject (experiment_id) VALUES (?)',
            (experiment_id)
        )
        con.commit()

    except sqlite3.Error as e:
        raise Exception(f"Error adding subject: {e}")
    
def add_sample(con, experiment_id, subject_id):
    """Add a new sample in the sample table"""
    try:
        cursor = con.cursor()
        cursor.execute(
        'INSERT INTO sample (experiment_id, subject_id) VALUES (?, ?)',
        (experiment_id, subject_id)
        )
        con.commit()
        return cursor.lastrowid
    except sqlite3.Error as e:
        raise Exception(f"Error adding sample: {e}")

def add_observation(con, sample_id):
    """Add a new observation in the observation table"""
    try:
        cursor = con.cursor()
        cursor.execute(
        'INSERT INTO observation (sample_id) VALUES (?)',
        (sample_id,)
        )
        con.commit()
        return cursor.lastrowid
    except sqlite3.Error as e:
        raise Exception(f"Error adding sample: {e}")

def add_value(con, value, attribute_id, table_id, level):
    """Add a new values in the attribute value table"""

    try:
        print(value, attribute_id, table_id)
        cursor = con.cursor()
        cursor.execute(f'INSERT INTO {level}_attribute_values (value, attribute_id, {level}_id) VALUES (?, ?, ?)', (
            value,
            attribute_id,
            table_id
        ))
        con.commit()
    except sqlite3.Error as e:
        raise Exception(f"Error adding value: {e}")

def delete_row(con, table, id):
    """Delete a row from a given table"""
    try:
        cursor = con.cursor()
        query = f'DELETE FROM {table} WHERE id = ?'  # Using f-string to safely insert table name
        cursor.execute(query, (id,))
        con.commit()

    except sqlite3.Error as e:
        raise Exception(f"Error deleting row: {e}")
    
def update_value(con, table, id, field, value):
    """Update the value a field in a row from a given table"""
    try:
        cursor = con.cursor()
        query = f'UPDATE {table} SET {field} = ? WHERE id = ?'  # Using f-string to safely insert table name
        cursor.execute(query, (value, id,))
        con.commit()

    except sqlite3.Error as e:
        raise Exception(f"Error updating value: {e}")

############################### READ VALUE ###############################

def get_experiments():
    """Retrieve all experiments from the database (predefined attributes + values)"""
    db = get_db()
    db.row_factory = make_dicts  # Ensure the data is converted to dictionaries when queried

    # Fetch the distinct attribute names for predefined attributes
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

def get_samples(experiment_id):
    """Retrieve all samples from an experiment (attributes + values)"""
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

def get_observations(sample_id):
    """Retrieve all observations from a sample (attributes + values)"""	
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

def get_subjects(experiment_id):
    """Retrieve all subjects from an experiment (attributes + values)"""
    db = get_db()
    db.row_factory = make_dicts  # Ensure the data is converted to dictionaries when queried

    # Fetch the distinct attribute names for non-custom subjects
    attribute_names = db.execute(
        '''
        SELECT DISTINCT name
        FROM subject_attributes
        WHERE experiment_id = ?
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

############################### READ ATTRIBUTES ###############################
def get_attributes(attribute_table, experiment_id):
    """Retrieve the attributes for a given table"""
    db = get_db()
    db.row_factory = make_dicts  # Ensure the data is converted to dictionaries when queried
    rows = db.execute(f'SELECT * FROM {attribute_table} WHERE experiment_id = ?', (experiment_id,)).fetchall()
    return rows

def get_columns(table_name):
    """Retrieve the column names of a given table"""
    db = get_db()
    db.row_factory = make_dicts  # Ensure the data is converted to dictionaries when queried
    query = f'PRAGMA table_info("{table_name}")'
    rows = db.execute(query).fetchall()
    return rows

def get_attributes_predetermined(table_name):
    """Retrieve the predetermined attributes for a given table"""
    json_path = os.path.join(os.path.dirname(__file__), 'predefined_attributes.json')
    with open(json_path) as f:
        data = json.load(f)
        print(data.get(table_name))
        return data.get(table_name)

# Get column names of a table
def get_column_names(table_name):
    db = get_db()
    db.row_factory = make_dicts  # Ensure the data is converted to dictionaries when queried
    columns_info = db.execute(f'PRAGMA table_info({table_name})').fetchall()
    column_names = [column['name'] for column in columns_info]
    return column_names