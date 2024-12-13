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
    with current_app.open_resource('mock-large.sql') as f:
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
def add_experiment(con, data):
    """Add a new experiment to the database

    Returns: The ID of the newly created experiment
    """
    try:
        cursor = con.cursor()
        cursor.execute(
            'INSERT INTO experiment (predefine_subject, name, duration, samples_number_goal, samples_time_goal, obs_number_goal, obs_time_goal) VALUES (?,?, ?,?,?,?,?)',
            ( data['predefine_subject'],data['name'],data['duration'], data['samples_number_goal'], data['samples_time_goal'], data['obs_number_goal'], data['obs_time_goal'],)
        )
        con.commit()
        return cursor.lastrowid
    except Exception as e:
        raise Exception(f"Error adding experiment: {e}")

def add_attribute(con, attribute, table_name, experiment_id):
    """Add a new attribute to a given table
    
        Returns: The ID of the newly created experiment
    """
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
    except Exception as e:
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
#     except Exception as e:
#         raise Exception(f"Error adding predefined attributes: {e}")

def add_subject(con, experiment_id, data):
    """Add a new subject in the subject table"""
    try:
        cursor = con.cursor()
        cursor.execute(
            'INSERT INTO subject (experiment_id, name, timestamp_creation) VALUES (?,?,?)',
            (experiment_id, data['name'], data['timestamp_creation'],) 
        )
        con.commit()

    except Exception as e:
        raise Exception(f"Error adding subject: {e}")
    
def add_sample(con, experiment_id, subject_id, timestamp_start):
    """Add a new sample in the sample table"""
    try:
        cursor = con.cursor()
        cursor.execute(
        'INSERT INTO sample (experiment_id, subject_id, timestamp_start) VALUES (?, ?, ?)',
        (experiment_id, subject_id, timestamp_start,)
        )
        con.commit()
        return cursor.lastrowid
    except Exception as e:
        raise Exception(f"Error adding sample: {e}")

def add_observation(con, sample_id, data):
    """Add a new observation in the observation table"""
    try:
        cursor = con.cursor()
        cursor.execute(
        'INSERT INTO observation (sample_id, timestamp_start, timestamp_end, status) VALUES (?, ?, ?,?)',
        (sample_id, data['timestamp_start'],data['timestamp_end'], data['status'])
        )
        con.commit()
        return cursor.lastrowid
    except Exception as e:
        raise Exception(f"Error adding sample: {e}")

def add_value(con, value, attribute_id, table_id, level):
    """Add a new values in the attribute value table"""

    try:
        cursor = con.cursor()
        cursor.execute(f'INSERT INTO {level}_attribute_values (value, attribute_id, {level}_id) VALUES (?, ?, ?)', (
            value,
            attribute_id,
            table_id
        ))
        con.commit()
    except Exception as e:
        raise Exception(f"Error adding value: {e}")

def delete_row(con, table, id):
    """Delete a row from a given table"""
    try:
        cursor = con.cursor()
        id_column = f"{table}_id"
        query = f'DELETE FROM {table} WHERE {id_column} = ?'  # Using f-string to safely insert table name
        cursor.execute(query, (id,))
        con.commit()

    except Exception as e:
        raise Exception(f"Error deleting row: {e}")
    
def update_value(con, table, id, field, value):
    """Update the value a field in a row from a given table"""
    id_column = f"{table}_id"
    try:
        cursor = con.cursor()
        query = f'UPDATE {table} SET {field} = ? WHERE {id_column} = ?'  # Using f-string to safely insert table name
        cursor.execute(query, (value, id,))
        con.commit()

    except Exception as e:
        raise Exception(f"Error updating value: {e}")

############################### READ VALUE ###############################

# def get_table(level):
#     db = get_db()
#     db.row_factory = make_dicts  # Ensure the data is converted to dictionaries when queried
#     rows = db.execute(f'SELECT * FROM {level}').fetchall()
#     return rows
def get_experiments_identification():
    """Retrieve the name and id of the experiment"""
    db = get_db()
    db.row_factory = make_dicts  # Ensure the data is converted to dictionaries when queried
    ids = db.execute(f'SELECT experiment_id, name FROM experiment').fetchall()
    return jsonify(ids)

def get_experiments():
    """Retrieve all experiments from the database (predefined attributes + values)"""
    db = get_db()
    db.row_factory = make_dicts  # Ensure the data is converted to dictionaries when queried

    # Fetch the distinct attribute names for predefined attributes
    attribute_names = db.execute(
        '''
        SELECT DISTINCT name
        FROM experiment_attributes
        '''
    ).fetchall()

    # Generate the pivot query
    columns = ["e.experiment_id AS experiment_id", "status", "timestamp_start", "timestamp_end", "e.name", "duration", "samples_number_goal", "samples_time_goal", "obs_number_goal", "obs_time_goal"]
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

def get_experiment(experiment_id):
    """Retrieve the experiment from the database (predefined attributes + values) for the given experiment_id
        ! return raw results, not jsonified    
    """
    db = get_db()
    db.row_factory = make_dicts  # Ensure the data is converted to dictionaries when queried

    # Fetch the distinct attribute names for predefined attributes
    attribute_names = db.execute(
        '''
        SELECT DISTINCT name
        FROM experiment_attributes
        WHERE experiment_id = ?
        ''', (experiment_id,)
    ).fetchall()

    # Generate the pivot query
    columns = ["e.experiment_id AS experiment_id", "e.status", "e.timestamp_start", "e.timestamp_end", "e.name", "duration","samples_number_goal", "samples_time_goal", "obs_number_goal", "obs_time_goal"]
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
    WHERE e.experiment_id = ?
    GROUP BY e.experiment_id
    """

    row = db.execute(pivot_query, (experiment_id,)).fetchone()
    return row

def get_samples(experiment_id):
    """Retrieve all samples from an experiment (attributes + values)
       ! return raw results, not jsonified    
    """
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
    columns = ["s.sample_id AS sample_id", "status", "timestamp_start", "timestamp_end"]
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
    return rows

def get_observations(experiment_id, sample_id):
    """Retrieve all observations from a sample (attributes + values)
        ! return raw results, not jsonified
    """
    
    db = get_db()
    db.row_factory = make_dicts  # Ensure the data is converted to dictionaries when queried

    # Fetch the distinct attribute names for non-custom observations
    attribute_names = db.execute(
        '''
        SELECT DISTINCT name
        FROM observation_attributes
        WHERE experiment_id = ?
        ''', (experiment_id,)
    ).fetchall()

    # Generate the pivot query
    columns = ["o.observation_id AS observation_id", "o.timestamp_start", "o.timestamp_end", "o.sample_id", "o.status"]
    for attribute in attribute_names:
        attribute_name = attribute['name']
        columns.append(f"MAX(CASE WHEN oa.name = '{attribute_name}' THEN oav.value END) AS \"{attribute_name}\"")

    columns_str = ", ".join(columns)

    pivot_query = f"""
    SELECT {columns_str}
    FROM observation o
    LEFT JOIN observation_attribute_values oav ON o.observation_id = oav.observation_id
    LEFT JOIN observation_attributes oa ON oav.attribute_id = oa.observation_attributes_id
    WHERE o.sample_id = ?
    GROUP BY o.observation_id, o.timestamp_start, o.timestamp_end, o.sample_id, o.status
    """

    rows = db.execute(pivot_query, (sample_id,)).fetchall()
    return rows

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


def get_attributes(level, experiment_id):
    """Retrieve the attributes for a given table"""
    db = get_db()
    db.row_factory = make_dicts  # Ensure the data is converted to dictionaries when queried
    target_table = level +"_attributes"
    rows = db.execute(f'SELECT * FROM {target_table} WHERE experiment_id = ?', (experiment_id,)).fetchall()
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
        return data.get(table_name)

# Get column names of a table
def get_column_names(table_name):
    db = get_db()
    db.row_factory = make_dicts  # Ensure the data is converted to dictionaries when queried
    columns_info = db.execute(f'PRAGMA table_info({table_name})').fetchall()
    column_names = [column['name'] for column in columns_info]
    return column_names

def get_duration(experiment_id):
    """Retrieve the duration (in second) of a sample from a given experiment"""
    db = get_db()
    db.row_factory = make_dicts  # Ensure the data is converted to dictionaries when queried
    duration = db.execute(f'SELECT duration FROM experiment WHERE experiment_id = ?', (experiment_id,)).fetchall()
    return jsonify(duration)