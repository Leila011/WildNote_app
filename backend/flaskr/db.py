import sqlite3
from datetime import datetime

import click
from flask import current_app, g, jsonify

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

# fill the database with mock data
def populate_mock():
    db = get_db()
    with current_app.open_resource('mock.sql') as f:
        db.executescript(f.read().decode('utf8'))
    db.commit()

# CLI command to initialize the database
# flask --app flaskr init-db
@click.command('init-db')
def init_db_command():
    """Clear the existing data and create new tables."""
    init_db()
    click.echo('Initialized the database.')
    populate_mock()
    click.echo('Populated the database with mock data.')

# Register the database functions with the application
def init_app(app):
    app.teardown_appcontext(close_db) # insure the connection is closed when the app context ends
    app.cli.add_command(init_db_command) # add the init-db command to the CLI

########### STEP 1 : Setup the experimental design ###########
# Add a new experiment item
def add_experiment_item(name, start_date, end_date):
    db = get_db()
    db.execute(
        'INSERT INTO experiment (name, start_date, end_date) VALUES (?, ?, ?)',
        (name, start_date, end_date)
    )
    db.commit()

# Add a new custom parameter to a table
def add_custom_parameter(name, type, parent_table, experiment_id):
    db = get_db()
    db.execute(
        'INSERT INTO custom_parameter (name, type, parent_table, experiment_id) VALUES (?, ?, ?, ?)',
        (name, type, parent_table, experiment_id)
    )
    db.commit()

# Add a new subject item in an experiment
def add_subject_item(experiment_id):
    db = get_db()
    db.execute(
        'INSERT INTO subject (name, experiment_id) VALUES (?, ?)',
        (experiment_id)
    )
    db.commit()

########### STEP 2 : Record  ###########
# Add a new sample item in an experiment
def add_sample_item(start, end, note, experiment_id, subject_id):
    db = get_db()
    db.execute(
        'INSERT INTO sample (start, end, note, experiment_id, subject_id) VALUES (?, ?,?, ?, ?)',
        (start, end, note, experiment_id, subject_id)
    )
    db.commit()

def add_custom_sample_item(value, custom_attributes_id, observation_id):
    db = get_db()
    db.execute(
        'INSERT INTO subject_custom (value, custom_attributes_id, observation_id) VALUES (?, ?, ?)',
        (value, custom_attributes_id, observation_id)
    )
    db.commit()

# Add a new observation in a sample
def add_observation_item(start, end, note, sample_id, subject_id):
    db = get_db()
    db.execute(
        'INSERT INTO observation (start, end, note, sample_id, subject_id) VALUES (?, ?, ?, ?, ?)',
        (start, end, note, sample_id, subject_id)
    )
    db.commit()

# Delete an item
def delete_item(table, id):
    db = get_db()
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

# Retrieve all items from a the experiment table (only fixed attributes)
def get_experiments():
    db = get_db()
    db.row_factory = make_dicts  #  insure the data is convertd to dictionaries when queried
    rows = db.execute('SELECT * FROM experiment').fetchall()
    return jsonify(rows)

# Retrieve all samples from an experiment
def get_samples(experiment_id):
    db = get_db()
    db.row_factory = make_dicts  #  insure the data is convertd to dictionaries when queried

    print(f"Fetching samples for experiment_id: {experiment_id}")

    rows = db.execute(f'SELECT * FROM sample WHERE experiment_id = ?', (experiment_id,)).fetchall()
    print(f"Rows fetched: {rows}")

    
    return jsonify(rows)

# Retrieve all observations from a sample
def get_observations(sample_id):
    db = get_db()
    db.row_factory = make_dicts  #  insure the data is convertd to dictionaries when queried
    rows = db.execute('SELECT * FROM observation WHERE sample_id = ?', (sample_id,)).fetchall()
    return jsonify(rows)

def get_table_schema(db, table_name):
    rows = db.execute(f'PRAGMA table_info({table_name})').fetchall()
    return rows

def generate_column_definitions(schema):
    columns = []
    for column in schema:
        columns.append({
            "name": column["name"],
            "type": column["type"]
        })
    return columns

def get_schema(db, table_name):
    schema = get_table_schema(db, table_name)
    columns = generate_column_definitions(schema)
    return columns

# Retrieve the custom attributes into jsonable format
def get_shema_custom(db, table_name, experiment_id):
    db.row_factory = make_dicts  # Ensure the data is converted to dictionaries when queried
    rows = db.execute(f'SELECT name, type FROM {table_name} WHERE experiment_id = ?', (experiment_id,)).fetchall()
    return rows

# Merge the custom attributes with the fixed attributes
def generate_pivot_query(parent_table, custom_attributes_table, custom_values_table, parent_id, parent_id_column):
    db = get_db()
    cursor = db.cursor()
    
    # Get the distinct attribute names for the specified custom attributes table
    cursor.execute(f"SELECT DISTINCT name FROM {custom_attributes_table}")
    attributes = cursor.fetchall()
    
    # Generate the pivot query
    columns = []
    for attribute in attributes:
        attribute_name = attribute['name']
        columns.append(f"MAX(CASE WHEN ca.name = '{attribute_name}' THEN sc.value END) AS {attribute_name}")
    
    columns_str = ", ".join(columns)
    if columns_str:
        columns_str = ", " + columns_str
    
    pivot_query = f"""
    SELECT s.*{columns_str}
    FROM {parent_table} s
    LEFT JOIN {custom_values_table} sc ON s.id = sc.{parent_table}_id
    LEFT JOIN {custom_attributes_table} ca ON sc.custom_attributes_id = ca.id
    WHERE s.{parent_id_column} = ? 
    GROUP BY s.id
    """
    
    return pivot_query

def get_pivoted_custom_attributes(parent_table, custom_attributes_table, custom_values_table, parent_id, parent_id_column):
    db = get_db()
    try:
        cursor = db.cursor()
        pivot_query = generate_pivot_query(parent_table, custom_attributes_table, custom_values_table, parent_id, parent_id_column)
        cursor.execute(pivot_query, (parent_id,))
        rows = cursor.fetchall()
        
        # Convert rows to dictionaries
        rows_dict = [dict(row) for row in rows]
        
        return jsonify(rows_dict)
    except sqlite3.Error as e:
        return jsonify({"error": str(e)}), 500
    finally:
        db.close()
