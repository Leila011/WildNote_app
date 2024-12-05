import os

from flask import Flask, jsonify
from flask_cors import CORS

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)

    # allow cross-origin requests (for development)
    CORS(app)

    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    from . import db

    # ??
    db.init_app(app)


    # api endpoints
    # get all experiments (fixed attributes only)
    @app.route('/api/experiments')
    def get_experiments():
        return db.get_experiments()
    
    # get all samples (fixed & custom attributes) for a given experiment    
    @app.route('/api/experiments/<int:id>/samples')
    def get_sample(id):
        return db.get_pivoted_custom_attributes('sample', 'sample_custom_attributes', 'sample_custom', id, 'experiment_id')
    
    # get all observations (fixed & custom attributes) for a given sample
    @app.route('/api/samples/<int:id>/observations')
    def get_observation_custom_attributes(id):
        return db.get_pivoted_custom_attributes('observation', 'observation_custom_attributes', 'observation_custom', id, 'sample_id')

    # get the schema for the experiment table
    @app.route('/schema/experiment')
    def get_schema_experiment():
        db_conn = db.get_db()
        fixed = db.get_schema(db_conn, "experiment")
        db_conn.close()
        return fixed
    
    # get the schema for the sample table
    @app.route('/schema/sample/<int:experiment_id>')
    def get_schema_sample(experiment_id):
        db_conn = db.get_db()
        fixed = db.get_schema(db_conn, "sample")
        custom = db.get_shema_custom(db_conn, "sample_custom_attributes", experiment_id)
        db_conn.close()
        return jsonify(fixed + custom)

   # get the schema for the observation table 
    @app.route('/schema/observation/<int:experiment_id>')
    def get_schema_observation(experiment_id):
        db_conn = db.get_db()
        fixed = db.get_schema(db_conn, "observation")
        custom = db.get_shema_custom(db_conn, "observation_custom_attributes", experiment_id)
        db_conn.close()
        return jsonify(fixed + custom)
    

    return app