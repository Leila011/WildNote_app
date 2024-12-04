import sqlite3
from datetime import datetime

import click
from flask import current_app, g

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

