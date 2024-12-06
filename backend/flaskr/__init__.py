import os

from flask import Flask, jsonify, request
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
    # STEP 1: add a new record to a table
    # add a new experiment + attributes
    @app.route('/api/experiment', methods=['POST'])
    def add_experiment():
        try:
            # get the data from the request
            data = request.get_json()
            if not data:
                return jsonify({"error": "Invalid JSON format"}), 400

            # connect to db
            con = db.get_db()
            cursor = con.cursor()

            # add a new experiment & retrieve the last inserted id
            db.add_experiment(con)
            last_inserted_id = cursor.lastrowid

            # add the custom attributes for the experiment
            for attribute in data.get('attributes', []):
                db.add_attribute(con, attribute['name'], attribute['type'], 'experiment_attributes', last_inserted_id)
            return jsonify({"message": "Experiment added successfully"}), 200
    
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    # add a new sample + attributes
    @app.route('/api/experiments/<int:id>/sample', methods=['POST'])
    def add_sample(id):
        try:
            # get the data from the request
            data = request.get_json()
            if not data:
                return jsonify({"error": "Invalid JSON format"}), 400

            # connect to db
            con = db.get_db()
            cursor = con.cursor()

            # add a new sample & retrieve the last inserted id
            db.add_sample(con, id, data.get('subject_id'))
            last_inserted_id = cursor.lastrowid

            # add the custom attributes for the experiment
            for attribute in data.get('attributes', []):
                db.add_attribute(con, attribute['name'], attribute['type'], 'sample_attributes', last_inserted_id)
            return jsonify({"message": "Sample added successfully"}), 200
    
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    # add a new subject + attributes
    @app.route('/api/experiments/<int:id>/subject', methods=['POST'])
    def add_subject(id):
        try:
            # get the data from the request
            data = request.get_json()
            if not data:
                return jsonify({"error": "Invalid JSON format"}), 400

            # connect to db
            con = db.get_db()
            cursor = con.cursor()

            # add a new sample & retrieve the last inserted id
            db.add_subject(con, id)
            last_inserted_id = cursor.lastrowid

            # add the custom attributes for the experiment
            for attribute in data.get('attributes', []):
                db.add_attribute(con, attribute['name'], attribute['type'], 'subject_attributes', last_inserted_id)
            return jsonify({"message": "Subject added successfully"}), 200
    
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    # add a new observation + attributes
    @app.route('/api/samples/<int:id>/observation', methods=['POST'])
    def add_observationt(id):
        try:
            # get the data from the request
            data = request.get_json()
            if not data:
                return jsonify({"error": "Invalid JSON format"}), 400

            # connect to db
            con = db.get_db()
            cursor = con.cursor()

            # add a new sample & retrieve the last inserted id
            db.add_observation(con, id, data.get('subject_id'))
            last_inserted_id = cursor.lastrowid

            # add the custom attributes for the experiment
            for attribute in data.get('attributes', []):
                db.add_attribute(con, attribute['name'], attribute['type'], 'observation_attributes', last_inserted_id)
            return jsonify({"message": "Observation added successfully"}), 200

        except Exception as e:
            return jsonify({"error": str(e)}), 500
        
    # STEP 2: add a new attribute value to a table
    @app.route('/api/<level>/values', methods=['POST'])
    def add_values(level):
        try:
            # get the data from the request
            data = request.get_json()
            if not data:
                return jsonify({"error": "Invalid JSON format"}), 400

            # connect to db
            con = db.get_db()

            # add the custom attributes for the experiment
            for attribute in data.get('attributes', []):
                db.add_value(con, attribute['value'], attribute['attribute_id'], f'{level}_attribute_values')	
            return jsonify({"message": "Attributes values added successfully"}), 200
        
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    # STEP 5: retrieve all records from a table with attribute and value
    # get all experiments
    @app.route('/api/experiments', methods=['GET'])
    def get_experiments():
        return db.get_experiments()
    
    # get all samples (fixed & custom attributes) for a given experiment    
    @app.route('/api/experiments/<int:id>/samples', methods=['GET'])
    def get_samples(id):
        return db.get_samples(id)
    
    @app.route('/api/experiments/<int:id>/subjects')
    def get_subjects(id):
        return db.get_subjects(id)
    
    # get all observations for a given sample
    @app.route('/api/samples/<int:id>/observations')
    def get_observations(id):
        return db.get_observations(id)
    
    # STEP 6: Retrieve the attribute description for a given table
    # get all attributes non custom for experiments
    @app.route('/api/attributes/predetermined/experiments')
    def get_attributes_predetermined():
        attributes = db.get_attributes_predetermined("experiment_attributes")
        columns = db.get_columns("experiment")
        return jsonify({"columns": columns, "attributes": attributes})
    
    @app.route('/api/attributes/<table_name>/experiment_id/<int:experiment_id>')
    def get_attributes(table_name, experiment_id):
        target_table = table_name +"_attributes"
        attributes = db.get_attributes(target_table, experiment_id)
        columns = db.get_columns(table_name)
        return jsonify({"columns": columns, "attributes": attributes})

    # @app.route('/api/addRecord/<table_name>', methods=['POST'])
    # def addRecord(table_name):
    #     try:
    #         data = request.get_json()
    #         if not data:
    #             return jsonify({"error": "Invalid JSON format"}), 400

    #         db.add_record(table_name, data)
    #         return jsonify({"message": "Record added successfully"}), 200
    #     except Exception as e:
    #         return jsonify({"error": str(e)}), 500

    # Data manipulation
    @app.route('/api/deleteRecords/<table_name>/<int:id>', methods=['GET'])
    def deleteRecords(table_name, id):
        try:
            db.delete_record(table_name, id)
            return jsonify({"message": "Record deleted successfully"}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500
        
    return app