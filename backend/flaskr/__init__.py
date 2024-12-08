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
    ################### Define experimental structure ###################
    # add a new experiment + define its structure
    @app.route('/api/experiment', methods=['POST'])
    def add_experiment():
        try:
            # get the data from the request
            data = request.get_json()
            if not data:
                return jsonify({"error": "Invalid JSON format"}), 400

            # connect to db
            con = db.get_db()

            # add a new experiment & retrieve the last inserted id
            experiment_id = db.add_experiment(con)

            # add the value of the predefined attributes for the experiment
            for attribute in data:
                attribute_id = db.add_attribute(con, attribute, 'experiment_attributes', experiment_id)
                db.add_value(con, attribute['value'], attribute_id, 'experiment_attribute_values')

        except Exception as e:
            con.rollback()
            return jsonify({"error": str(e)}), 500
    
        finally:
            con.close()
            return jsonify({"message": "Experiment added successfully", "experiment_id": experiment_id}), 200


    # define the structure of the the sample
    @app.route('/api/experiment/<int:experiment_id>/sample', methods=['POST'])
    def add_sample(experiment_id):

        try:
            # get the data from the request
            data = request.get_json()
            if not data:
                return jsonify({"error": "Invalid JSON format"}), 400

            # connect to db
            con = db.get_db()

            # add the predefined attributes for the experiment
            #db.add_predefined_attributes(con, 'sample', experiment_id)

            # add the custom attributes for the experiment
            for attribute in data:
                db.add_attribute(con, attribute, 'sample_attributes', experiment_id)  
    
        except Exception as e:
            con.rollback()
            return jsonify({"error": str(e)}), 500
    
        finally:
            con.close()
            return jsonify({"message": "Sample attributes added successfully"}), 200
        


    # define the structure of a subject 
    @app.route('/api/experiment/<int:experiment_id>/subject', methods=['POST'])
    def add_subject(experiment_id):
        try:
            # get the data from the request
            data = request.get_json()
            if not data:
                return jsonify({"error": "Invalid JSON format"}), 400

            # connect to db
            con = db.get_db()

            # add the predefined attributes for the experiment
            #db.add_predefined_attributes(con, 'subject', last_inserted_id)

            # add the custom attributes for the experiment
            for attribute in data:
                db.add_attribute(con, attribute,                           
                                'subject_attributes', 
                                experiment_id)            
            return jsonify({"message": "Subject added successfully"}), 200
    
        except Exception as e:
            con.rollback()
            return jsonify({"error": str(e)}), 500

    # define the structure of an observation
    @app.route('/api/experiment/<int:experiment_id>/observation', methods=['POST'])
    def add_observationt(experiment_id):
        try:
            # get the data from the request
            data = request.get_json()
            if not data:
                return jsonify({"error": "Invalid JSON format"}), 400

            # connect to db
            con = db.get_db()

            # add the predefined attributes for the experiment
            #db.add_predefined_attributes(con, 'observation', last_inserted_id)

            # add the custom attributes for the experiment
            for attribute in data:
                db.add_attribute(con, 
                                attribute, 
                                'observation_attributes', 
                                experiment_id)   
                return jsonify({"message": "Observation added successfully"}), 200

        except Exception as e:
            con.rollback()
            return jsonify({"error": str(e)}), 500
        
    ############### add a attributes value to a table ###################
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
            con.rollback()
            return jsonify({"error": str(e)}), 500

    ############ retrieve all records from a table (attribute + value) ############
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
    
    # Retrieve the attribute description#
    # Special one required when creating a new experiment
    @app.route('/api/attributes/experiments')
    def get_attributes_experiment():
        attributes = db.get_attributes_predetermined("experiment")
        columns = db.get_columns("experiment")
        return jsonify({"columns": columns, "attributes": attributes})
    
    # All other tables 
    @app.route('/api/attributes/<table_name>/experiment_id/<int:experiment_id>')
    def get_attributes(table_name, experiment_id):
        target_table = table_name +"_attributes"
        attributes = db.get_attributes(target_table, experiment_id)
        columns = db.get_columns(table_name)
        return jsonify({"columns": columns, "attributes": attributes})
    
    # Retrieve the attribute description for displaying the entry #
    # Get the predetermined attributes
    # @app.route('/api/attributes/predetermined/<table_name>')
    # def get_attributes_predetermined(table_name):
    #     attributes = db.get_attributes_predetermined(table_name)
    #     return jsonify(attributes)
    
    # # Get the main table columns
    # @app.route('/api/columnNames/<table_name>')
    # def get_columns(table_name):
    #     columns = db.get_columns(table_name)
    #     return jsonify(columns)

    # Data manipulation
    @app.route('/api/deleteRecords/<table_name>/<int:id>', methods=['GET'])
    def delete_row(table_name, id):
        try:
            db.delete_row(table_name, id)
            return jsonify({"message": "Record deleted successfully"}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500
        
    return app