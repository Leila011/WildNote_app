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
                db.add_value(con, attribute['value'], attribute_id, experiment_id, 'experiment')	

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
    
        except Exception as e:
            con.rollback()
            return jsonify({"error": str(e)}), 500
    
        finally:
            con.close()
            return jsonify({"message": "Sample attributes added successfully"}), 200

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

        except Exception as e:
            con.rollback()
            return jsonify({"error": str(e)}), 500
    
        finally:
            con.close()
            return jsonify({"message": "Sample attributes added successfully"}), 200
        
    ############### add a attributes value to a table ###################
    @app.route('/api/experiment/<int:experiment_id>/newSample', methods=['POST'])
    def add_newSample(experiment_id):
        try:
            # get the data from the request
            data = request.get_json()
            if not data:
                return jsonify({"error": "Invalid JSON format"}), 400
            # connect to db
            con = db.get_db()

            # add a new sample & retrieve the last inserted id
            sample_id = db.add_sample(con, experiment_id, data['columns']['subject']['subject_id'])

            # add the custom attributes for the experiment
            for attribute in data['attributes']:
                db.add_value(con, attribute['value'], attribute['sample_attributes_id'], sample_id, 'sample')	
        
        except Exception as e:
            con.rollback()
            return jsonify({"error": str(e)}), 500
    
        finally:
            con.close()
            return jsonify({"message": "Attributes values added successfully","sample_id": sample_id}), 200

        
    @app.route('/api/sample/<int:sample_id>/newObservation', methods=['POST'])
    def add_newObservation(sample_id):
        try:
            # get the data from the request
            data = request.get_json()
            if not data:
                return jsonify({"error": "Invalid JSON format"}), 400
            # connect to db
            con = db.get_db()

            # add a new sample & retrieve the last inserted id
            observation_id = db.add_observation(con, sample_id)

            # add the custom attributes for the experiment
            for attribute in data['attributes']:
                db.add_value(con, attribute['value'], attribute['observation_attributes_id'], observation_id, 'observation')	
        
        except Exception as e:
            con.rollback()
            return jsonify({"error": str(e)}), 500
    
        finally:
            con.close()
            return jsonify({"message": "observation attributes values added successfully"}), 200


    # # add value of an attribute (used for attrobute that are set after sample creation for exaple end time)
    # @app.route('/api/updateAttributeValue/<level>/<attribute_id>/<item_id>', methods=['GET'])
    # def add_attribute_value(level, attribute_id, item_id):
    #     try:

    #         # get the data from the request
    #         value = request.get_json()
    #         if not value:
    #             return jsonify({"error": "Invalid JSON format"}), 400
            
    #         # connect to db
    #         con = db.get_db()
    #         db.add_value(con, value, attribute_id, item_id, level )
    #     except Exception as e:
    #         return jsonify({"error": str(e)}), 500    
        
    #     finally:
    #         con.close()
    #         return jsonify({"message": "attribute value added successfully"}), 200
        
    # add value of an column (used for column that are set after sample creation for exaple end time)
    @app.route('/api/updateValue/<level>/<column_name>/<row_id>', methods=['POST'])
    def update_value(level, column_name, row_id):
        try:

            # get the data from the request
            value = request.get_json()
            if not value:
                return jsonify({"error": "Invalid JSON format"}), 400
            
            # connect to db
            con = db.get_db()
            db.update_value(con, level, row_id, column_name, value)

        except Exception as e:
            return jsonify({"error": str(e)}), 500    
        
        finally:
            con.close()
            return jsonify({"message": "attribute value added successfully"}), 200

    ############ retrieve all records from a table (attribute + value) ############
    
    # # get a table
    # @app.route('/api/<level>', methods=['GET'])
    # def get_table(level):
    #     return db.get_table(level)
    
    # get all experiments
    @app.route('/api/experiments/attributeValues', methods=['GET'])
    def get_experiments():
        return db.get_experiments()
    
    # get all samples (fixed & custom attributes) for a given experiment    
    @app.route('/api/experiments/<int:id>/samples/attributeValues', methods=['GET'])
    def get_samples(id):
        return db.get_samples(id)
    
    @app.route('/api/experiments/<int:id>/subjects/attributeValues', methods=['GET'])
    def get_subjects(id):
        return db.get_subjects(id)
    
    # get all observations for a given sample
    @app.route('/api/experiments/<int:experiment_id>/samples/<int:sample_id>/observations/attributeValues', methods=['GET'])
    def get_observations(experiment_id, sample_id):
        print(experiment_id)
        print(sample_id)

        return db.get_observations(experiment_id, sample_id)
    
    # Retrieve the attribute description#
    # Special one required when creating a new experiment
    @app.route('/api/experiments/attributes', methods=['GET'])
    def get_attributes_experiment():
        attributes = db.get_attributes_predetermined("experiment")
        columns = db.get_columns("experiment")
        return jsonify({"columns": columns, "attributes": attributes})
    
    # All other tables 
    @app.route('/api/experiments/<int:experiment_id>/<table_name>/attributes')
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
    @app.route('/api/<table_name>/<int:id>/delete', methods=['GET'])
    def delete_row(table_name, id):
        try:
            con = db.get_db()
            db.delete_row(con, table_name, id)
        except Exception as e:
            return jsonify({"error": str(e)}), 500    
        
        finally:
            con.close()
            return jsonify({"message": "row deleted successfully"}), 200

    return app
