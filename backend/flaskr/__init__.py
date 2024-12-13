import os

from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd

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
    from . import stat
    from . import utils


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
            experiment_id = db.add_experiment(con, data['columns'])

            # add the value of the predefined attributes for the experiment
            for attribute in data['attributes']:
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
            sample_id = db.add_sample(con, experiment_id, data['columns']['subject_id'],  data['columns']['timestamp_start'])

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
            observation_id = db.add_observation(con, sample_id, data['columns'])

            # add the custom attributes for the experiment
            for attribute in data['attributes']:
                db.add_value(con, attribute['value'], attribute['observation_attributes_id'], observation_id, 'observation')	
        
        except Exception as e:
            con.rollback()
            return jsonify({"error": str(e)}), 500
    
        finally:
            con.close()
            return jsonify({"message": "observation attributes values added successfully"}), 200


    @app.route('/api/experiment/<int:experiment_id>/newSubject', methods=['POST'])
    def add_newSubject(experiment_id):
        try:
            # get the data from the request
            data = request.get_json()
            if not data:
                return jsonify({"error": "Invalid JSON format"}), 400
            # connect to db
            con = db.get_db()

            # add a new sample & retrieve the last inserted id
            subject_id = db.add_subject(con, experiment_id, data['columns'])

            # add the custom attributes for the experiment
            for attribute in data['attributes']:
                db.add_value(con, attribute['value'], attribute['subject_attributes_id'], subject_id, 'subject')	
        
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
    
    @app.route('/api/experiments/identification', methods=['GET'])
    def get_experiments_identification():
        return db.get_experiments_identification()
    
    # get one specific experiment
    @app.route('/api/experiment/<int:experiment_id>/attributeValues', methods=['GET'])
    def get_experiment(experiment_id):
        return jsonify(db.get_experiment(experiment_id))
    
    # get all samples (fixed & custom attributes) for a given experiment    
    @app.route('/api/experiments/<int:id>/samples/attributeValues', methods=['GET'])
    def get_samples(id):
        return jsonify(db.get_samples(id))
    
    
    @app.route('/api/experiments/<int:id>/subjects/attributeValues', methods=['GET'])
    def get_subjects(id):
        return db.get_subjects(id)
    
    # get all observations for a given sample
    @app.route('/api/experiments/<int:experiment_id>/samples/<int:sample_id>/observations/attributeValues', methods=['GET'])
    def get_observations(experiment_id, sample_id):
        return jsonify(db.get_observations(experiment_id, sample_id))
    
    # Retrieve the attribute description#
    # Special one required when creating a new experiment
    @app.route('/api/experiments/attributes', methods=['GET'])
    def get_attributes_experiment():
        attributes = db.get_attributes_predetermined("experiment")
        schemas = db.get_columns("experiment")
        return jsonify({"schema": schemas, "attributes": attributes})
    
    # Retrive the duration set for a sample from a given experiment
    @app.route('/api/experiments/<int:experiment_id>/duration', methods=['GET'])
    def get_duration(experiment_id):
        return db.get_duration(experiment_id)

    # All other tables 
    @app.route('/api/experiments/<int:experiment_id>/<level>/attributes', methods=['GET'])
    def get_attributes(level, experiment_id):
        
        attributes = db.get_attributes(level, experiment_id)
        schemas = db.get_columns(level)
        return jsonify({"schemas": schemas, "attributes": attributes})
    
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

    ############################ COMPUTATION #######################################
    #get descriptive statistics for all attributes of a sample of an experiment
    @app.route('/api/experiments/<int:experiment_id>/sample/descriptiveStat', methods=['GET'])
    def get_decriptive_stat_sample(experiment_id):
        data = db.get_samples(experiment_id)
        attributes = db.get_attributes('sample', experiment_id)
        res = stat.descriptive_stat(data, attributes)
        return jsonify(utils.replace_nan(res))
    
        #get descriptive statistics for all attributes of a obs of an experiment
    @app.route('/api/experiments/<int:experiment_id>/observation/descriptiveStat', methods=['GET'])
    def get_decriptive_stat_obs(experiment_id):
        sampleData = db.get_samples(experiment_id)
        data = []
        for sample in sampleData:
            observations = db.get_observations(experiment_id, sample['sample_id'])
            data = data +observations
        attributes = db.get_attributes('observation' , experiment_id)
        res = stat.descriptive_stat(data, attributes)
        return jsonify(utils.replace_nan(res))
    
    #get descriptive plot data for all attributes of observations of an experiment
    @app.route('/api/experiments/<int:experiment_id>/sample/descriptivePlot', methods=['GET'])
    def get_descriptive_plot_samples(experiment_id):
        data = db.get_samples(experiment_id)
        attributes = db.get_attributes('sample', experiment_id)
        res = stat.descriptive_plot(data, attributes)
        return jsonify(utils.replace_nan(res))
    
       #get descriptive plot data for all attributes of samples of an experiment
    @app.route('/api/experiments/<int:experiment_id>/observation/descriptivePlot', methods=['GET'])
    def get_descriptive_plot_obs(experiment_id):
        sampleData = db.get_samples(experiment_id)
        data = []
        for sample in sampleData:
            observations = db.get_observations(experiment_id, sample['sample_id'])
            data = data +observations
        attributes = db.get_attributes('observation', experiment_id)
        res = stat.descriptive_plot(data, attributes)
        return jsonify(utils.replace_nan(res))
    
    @app.route('/api/experiment/<int:experiment_id>/stat', methods=['GET'])
    def get_experiment_stat(experiment_id):
        experimentData = db.get_experiment(experiment_id)
        sampleData = db.get_samples(experiment_id)

        obsData = []
        for sample in sampleData:
            observations = db.get_observations(experiment_id, sample['sample_id'])
            obsData = obsData +observations
        res = stat.experiment_stat(experimentData, sampleData, obsData)
        return jsonify(utils.replace_nan(res))
    
    @app.route('/api/experiment/<int:experiment_id>/calendar', methods=['GET'])
    def get_experiment_calendar(experiment_id):
        sampleData = db.get_samples(experiment_id)
        res = stat.calendar(sampleData)
        return jsonify(utils.replace_nan(res))
    
    @app.route('/api/experiment/<int:experiment_id>/sample/polarPlot', methods=['GET'])
    def get_sample_polar(experiment_id):
        sampleData = db.get_samples(experiment_id)
        res = stat.polar(sampleData)
        return jsonify(utils.replace_nan(res))
    
    @app.route('/api/experiment/<int:experiment_id>/observation/polarPlot', methods=['GET'])
    def get_obs_polar(experiment_id):
        sampleData = db.get_samples(experiment_id)

        obsData = []
        for sample in sampleData:
            observations = db.get_observations(experiment_id, sample['sample_id'])
            obsData = obsData +observations
        res = stat.polar(obsData)
        return jsonify(utils.replace_nan(res))
    
    # get mean/freq for each attributes of observation along time
    @app.route('/api/experiments/<int:experiment_id>/observation/timeline', methods=['GET'])
    def get_observations_timeline(experiment_id):
        sampleData = db.get_samples(experiment_id)
        data = []
        for sample in sampleData:
            observations = db.get_observations(experiment_id, sample['sample_id'])
            data = data +observations
        df = pd.DataFrame(data)
        df_augmented = stat.add_columns(df, 'observation')
        attributes = db.get_attributes('observation', experiment_id)
        res = stat.timelineAttributes(df_augmented, attributes)
        return jsonify(utils.replace_nan(res))
    
    # get all samples (fixed & custom attributes) for a given experiment     (object of column)
    @app.route('/api/experiments/<int:experiment_id>/sample/timeline', methods=['GET'])
    def get_samples_timeline(experiment_id):
        sampleData = db.get_samples(experiment_id)
        df = pd.DataFrame(sampleData)
        df_augmented = stat.add_columns(df, 'sample')
        attributes = db.get_attributes('sample', experiment_id)
        res = stat.timelineAttributes(df_augmented, attributes)
        return jsonify(utils.replace_nan(res))
        
    return app

