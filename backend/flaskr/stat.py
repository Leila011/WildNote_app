import pandas as pd
import numpy as np
import datetime

experimentData = [{'experiment_id': 1, 'status': 'completed', 'timestamp_start': datetime.datetime(2024, 12, 1, 8, 0), 'timestamp_end': datetime.datetime(2024, 12, 1, 18, 0), 'name': 'Monkey Forest Study', 'description': 'Mock data of a study of money-human interactions in a monkey forest setting'}]
sampleData = [{'sample_id': 1, 'status': 'completed', 'timestamp_start': datetime.datetime(2024, 1, 1, 8, 0), 'timestamp_end': datetime.datetime(2024, 1, 1, 8, 10), 'localisation': '3', 'weather': 'sun', 'group_size': '9', 'num_adult_men': '5', 'num_adult_women': '4', 'num_kids': '4'}, {'sample_id': 2, 'status': 'completed', 'timestamp_start': datetime.datetime(2024, 1, 1, 8, 15), 'timestamp_end': datetime.datetime(2024, 1, 1, 8, 25), 'localisation': '3', 'weather': 'sun', 'group_size': '9', 'num_adult_men': '5', 'num_adult_women': '4', 'num_kids': '4'}, {'sample_id': 3, 'status': 'completed', 'timestamp_start': datetime.datetime(2024, 1, 1, 8, 30), 'timestamp_end': datetime.datetime(2024, 1, 1, 8, 40), 'localisation': '3', 'weather': 'sun', 'group_size': '9', 'num_adult_men': '5', 'num_adult_women': '4', 'num_kids': '4'}, {'sample_id': 4, 'status': 'completed', 'timestamp_start': datetime.datetime(2024, 1, 1, 8, 45), 'timestamp_end': datetime.datetime(2024, 1, 1, 8, 55), 'localisation': '3', 'weather': 'sun', 'group_size': '9', 'num_adult_men': '5', 'num_adult_women': '4', 'num_kids': '4'}, {'sample_id': 5, 'status': 'completed', 'timestamp_start': datetime.datetime(2024, 1, 1, 9, 0), 'timestamp_end': datetime.datetime(2024, 1, 1, 9, 10), 'localisation': '3', 'weather': 'sun', 'group_size': '9', 'num_adult_men': '5', 'num_adult_women': '4', 'num_kids': '4'}, {'sample_id': 6, 'status': 'completed', 'timestamp_start': datetime.datetime(2024, 1, 1, 9, 15), 'timestamp_end': datetime.datetime(2024, 1, 1, 9, 25), 'localisation': '3', 'weather': 'sun', 'group_size': '9', 'num_adult_men': '5', 'num_adult_women': '4', 'num_kids': '4'}, {'sample_id': 7, 'status': 'completed', 'timestamp_start': datetime.datetime(2024, 1, 1, 9, 30), 'timestamp_end': datetime.datetime(2024, 1, 1, 9, 40), 'localisation': '3', 'weather': 'sun', 'group_size': '9', 'num_adult_men': '5', 'num_adult_women': '4', 'num_kids': '4'}, {'sample_id': 8, 'status': 'completed', 'timestamp_start': datetime.datetime(2024, 1, 1, 9, 45), 'timestamp_end': datetime.datetime(2024, 1, 1, 9, 55), 'localisation': '3', 'weather': 'sun', 'group_size': '9', 'num_adult_men': '5', 'num_adult_women': '4', 'num_kids': '4'}, {'sample_id': 9, 'status': 'completed', 'timestamp_start': datetime.datetime(2024, 1, 1, 10, 0), 'timestamp_end': datetime.datetime(2024, 1, 1, 10, 10), 'localisation': '3', 'weather': 'sun', 'group_size': '9', 'num_adult_men': '5', 'num_adult_women': '4', 'num_kids': '4'}, {'sample_id': 10, 'status': 'completed', 'timestamp_start': datetime.datetime(2024, 1, 1, 10, 15), 'timestamp_end': datetime.datetime(2024, 1, 1, 10, 25), 'localisation': '3', 'weather': 'sun', 'group_size': '9', 'num_adult_men': '5', 'num_adult_women': '4', 'num_kids': '4'}]
observationData =[{'observation_id': 1, 'timestamp_start': datetime.datetime(2024, 1, 1, 8, 0), 'timestamp_end': datetime.datetime(2024, 1, 1, 8, 3), 'sample_id': 1, 'status': 'completed', 'monkey_gender': 'Male', 'monkey_group': '1', 'monkey_health': 'good', 'monkey_age': 'adult', 'interaction': 'Aggressive level 1', 'visible_food': '1'}, {'observation_id': 2, 'timestamp_start': datetime.datetime(2024, 1, 1, 8, 3), 'timestamp_end': datetime.datetime(2024, 1, 1, 8, 6), 'sample_id': 1, 'status': 'completed', 'monkey_gender': 'Female', 'monkey_group': '2', 'monkey_health': 'good', 'monkey_age': 'teenage', 'interaction': 'Aggressive level 2', 'visible_food': '0'}, {'observation_id': 3, 'timestamp_start': datetime.datetime(2024, 1, 1, 8, 6), 'timestamp_end': datetime.datetime(2024, 1, 1, 8, 10), 'sample_id': 1, 'status': 'completed', 'monkey_gender': 'Male', 'monkey_group': '3', 'monkey_health': 'good', 'monkey_age': 'child', 'interaction': 'Physical contact', 'visible_food': '1'}, {'observation_id': 4, 'timestamp_start': datetime.datetime(2024, 1, 1, 8, 15), 'timestamp_end': datetime.datetime(2024, 1, 1, 8, 18), 'sample_id': 2, 'status': 'completed', 'monkey_gender': 'Female', 'monkey_group': '1', 'monkey_health': 'good', 'monkey_age': 'adult', 'interaction': 'Aggressive level 3', 'visible_food': '0'}, {'observation_id': 5, 'timestamp_start': datetime.datetime(2024, 1, 1, 8, 18), 'timestamp_end': datetime.datetime(2024, 1, 1, 8, 25), 'sample_id': 2, 'status': 'completed', 'monkey_gender': 'Male', 'monkey_group': '2', 'monkey_health': 'good', 'monkey_age': 'adult', 'interaction': 'Physical contact', 'visible_food': '1'}, {'observation_id': 6, 'timestamp_start': datetime.datetime(2024, 1, 1, 8, 30), 'timestamp_end': datetime.datetime(2024, 1, 1, 8, 33), 'sample_id': 3, 'status': 'completed', 'monkey_gender': 'Female', 'monkey_group': '3', 'monkey_health': 'good', 'monkey_age': 'teenage', 'interaction': 'Aggressive level 1', 'visible_food': '0'}, {'observation_id': 7, 'timestamp_start': datetime.datetime(2024, 1, 1, 8, 33), 'timestamp_end': datetime.datetime(2024, 1, 1, 8, 36), 'sample_id': 3, 'status': 'completed', 'monkey_gender': 'Male', 'monkey_group': '1', 'monkey_health': 'good', 'monkey_age': 'child', 'interaction': 'Aggressive level 2', 'visible_food': '1'}, {'observation_id': 8, 'timestamp_start': datetime.datetime(2024, 1, 1, 8, 36), 'timestamp_end': datetime.datetime(2024, 1, 1, 8, 40), 'sample_id': 3, 'status': 'completed', 'monkey_gender': 'Female', 'monkey_group': '2', 'monkey_health': 'good', 'monkey_age': 'adult', 'interaction': 'Physical contact', 'visible_food': '0'}, {'observation_id': 9, 'timestamp_start': datetime.datetime(2024, 1, 1, 8, 45), 'timestamp_end': datetime.datetime(2024, 1, 1, 8, 48), 'sample_id': 4, 'status': 'completed', 'monkey_gender': 'Male', 'monkey_group': '3', 'monkey_health': 'good', 'monkey_age': 'teenage', 'interaction': 'Aggressive level 3', 'visible_food': '1'}, {'observation_id': 10, 'timestamp_start': datetime.datetime(2024, 1, 1, 8, 48), 'timestamp_end': datetime.datetime(2024, 1, 1, 8, 55), 'sample_id': 4, 'status': 'completed', 'monkey_gender': 'Female', 'monkey_group': '1', 'monkey_health': 'good', 'monkey_age': 'adult', 'interaction': 'Aggressive level 1', 'visible_food': '0'}]
samples = [{'sample_id': 114, 'timestamp_start': datetime.datetime(2023, 1, 1, 8, 0), 'timestamp_end': datetime.datetime(2023, 1, 1, 9, 0), 'experiment_id': 2, 'status': 'active', 'location': 'loc1', 'group': 'group1'}, {'sample_id': 115, 'timestamp_start': datetime.datetime(2023, 1, 1, 9, 0), 'timestamp_end': datetime.datetime(2023, 1, 1, 10, 0), 'experiment_id': 2, 'status': 'completed', 'location': 'loc2', 'group': 'group2'}, {'sample_id': 116, 'timestamp_start': datetime.datetime(2023, 1, 1, 10, 0), 'timestamp_end': datetime.datetime(2023, 1, 1, 11, 0), 'experiment_id': 2, 'status': 'active', 'location': 'loc3', 'group': 'group1'}, {'sample_id': 117, 'timestamp_start': datetime.datetime(2023, 1, 1, 11, 0), 'timestamp_end': datetime.datetime(2023, 1, 1, 12, 0), 'experiment_id': 2, 'status': 'completed', 'location': 'loc1', 'group': 'group2'}, {'sample_id': 118, 'timestamp_start': datetime.datetime(2023, 1, 1, 12, 0), 'timestamp_end': datetime.datetime(2023, 1, 1, 13, 0), 'experiment_id': 2, 'status': 'active', 'location': 'loc2', 'group': 'group1'}]
def experiment_stat(experimentData, sampleData, observationData):
    ''' number of sample
        cumulative sample time
        number of sample with status !== "completed"
        number of sample with time < duration
        number of sample without observation
        number of observation
        cumulative observation time
        data integrity: missing value, duplicate value, outlier, number with status !== "completed", number with time < duration. number without observation
    '''
    experiment = experimentData
    samples = pd.DataFrame(sampleData)
    obs = pd.DataFrame(observationData)
    
    res = {}
    # number of sample
    res['sample_nb'] = samples.shape[0]
    # cumulative sample time
    samples['duration'] = (samples['timestamp_end'] - samples['timestamp_start']).dt.total_seconds()
    res['sample_time_tot'] = samples['duration'].sum()
    res['sample_time_mean'] = samples['duration'].mean()
    res['sample_time_median'] = samples['duration'].median()
    # number of sample with status !== "completed"
    res['sample_incomplete_nb'] = samples[samples['status'] != 'completed'].shape[0]
    # number of sample with time < duration
    if experiment['duration'] is not None and experiment['duration'] != 0:
        res['sample_short_nb'] = samples[samples['duration'] < experiment['duration']].shape[0]
                                
    # number of sample without observation
    res['sample_empty_nb'] = samples[~samples['sample_id'].isin(obs['sample_id'])].shape[0]
    # number of observation
    res['obs_nb'] = obs.shape[0]
    # cumulative observation time
    obs['duration'] = (obs['timestamp_end'] - obs['timestamp_start']).dt.total_seconds()
    res['obs_time_tot'] = obs['duration'].sum()  
    res['obs_time_mean'] = obs['duration'].mean()
    res['obs_time_median'] = obs['duration'].median()
    # number of sample with status !== "completed"
    res['obs_incomplete_nb'] = obs[obs['status'] != 'completed'].shape[0]  

    return res

def descriptive_stat(data, attributes):
    '''continous value: average, median, max, min, std, 25%, 75%
       categorial value: count, unique, top, freq
       missing value: count
    '''
    df = pd.DataFrame(data)
    df_info = pd.DataFrame(attributes)
    description = {}
    # get desciptive statistics for each column of the data table
    for index, row in df_info.iterrows():
        # add missing value count
        if row.type == 'number':
            # convert to number (dirty fix for type error in the mock data)
            df[row['name']] = pd.to_numeric(df[row['name']])
            description[row['name']] = df.loc[:, row['name']].describe().to_dict()

        if row.type == 'string' or row.type == 'choice':
            description[row['name']] = df.loc[:, row['name']].describe().to_dict()


    # add new columns
    df['duration'] = (df['timestamp_end'] - df['timestamp_start']).dt.total_seconds()
    description['duration'] = df.loc[:, 'duration'].describe().to_dict()

    return description


def descriptive_plot(data, attributes):
    '''continuous value:  histogram
       categorial value: bar plot
    '''
    df = pd.DataFrame(data)
    df_info = pd.DataFrame(attributes)

    plotData = {}
    # plot each column of the data table
    for index, row in df_info.iterrows():
        column_name = row['name']
        if row.type == 'number':
            # convert to number (dirty fix for type error in the mock data)
            df[column_name] = pd.to_numeric(df[column_name])
            hist, bin_edges = np.histogram(df[column_name].dropna(), bins=10, range=None, density=None, weights=None)
            plotData[column_name] = {
                'hist': hist.tolist(),
                'bin_edges': bin_edges.tolist()
            }

        if row.type in ['string', 'choice']:
            # Filter out None values
            filtered_data = df[column_name].dropna()
            unique, inverse, counts = np.unique(filtered_data, return_inverse=True, return_counts=True)
            plotData[column_name] = {
                'unique': unique.tolist(),
                'inverse': inverse.tolist(),
                'counts': counts.tolist()
            }

    # add new columns
    df['duration'] = (df['timestamp_end'] - df['timestamp_start']).dt.total_seconds()
    hist, bin_edges = np.histogram(df['duration'].dropna(), bins=10, range=None, density=None, weights=None)
    
    plotData['duration'] = {
        'hist': hist.tolist(),
        'bin_edges': bin_edges.tolist()
    }
    
    return plotData

def calendar(samples):
    '''calendar data for apex heatmap
    '''
    df = pd.DataFrame(samples)
    df['year'] = df['timestamp_start'].dt.year
    df['date'] = df['timestamp_start'].dt.date
    start_dt = df['date'].min()
    end_dt = df['date'].max()
    date_range = pd.date_range(start=start_dt, end=end_dt, freq='d')

    # get range from a monday to a sunday
    start_dt_weekday_nb= start_dt.weekday() 
    end_dt_weekday_nb = end_dt.weekday()
    new_start_dt =  start_dt - pd.Timedelta(days=start_dt_weekday_nb)
    start_dt_monday = new_start_dt if (start_dt_weekday_nb != 0 and new_start_dt.year == start_dt.year) else start_dt
    new_end_dt = end_dt + pd.Timedelta(days=6 - end_dt_weekday_nb)
    end_dt_sunday =  new_end_dt if (end_dt_weekday_nb != 6 and new_end_dt.year == end_dt.year) else end_dt
    date_range = pd.date_range(start=start_dt_monday, end=end_dt_sunday, freq='d')
    
    # dates out of the study range
    out_start = [] if start_dt_monday== start_dt else pd.date_range(start=start_dt_monday, end=start_dt, inclusive="left", freq='d').to_list()
    out_end = [] if end_dt== end_dt_sunday else pd.date_range(start=end_dt, end=end_dt_sunday, inclusive="right", freq='d').to_list()
    out_timestamp = out_start + out_end
    out_dates = [date.date() for date in out_timestamp] 

    # Convert unique dates to ISO format strings
    #unique_dates_iso = [date.isoformat() for date in df['date'].unique()]
    dates_iso = [date.isoformat() for date in df['date']]

  # Initialize calendarData structure
    unique_years =  date_range.year.unique()
    calendarData = {}
    for year in unique_years:
        calendarData[str(year)] = {
            "series": [{"name": day, "data": []} for day in ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]]
        }
    weekday_names = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    # loop through all dates in the range
    res = {}
    
    # Loop through each day from start_date to end_date
    current_date = start_dt_monday
    while current_date <= end_dt_sunday:
        day_str = weekday_names[current_date.weekday()]
        week_number_str = "W" + str(current_date.isocalendar().week)
        isOut = current_date in out_dates
        # Count occurrences of the current day in days_iso
        count = dates_iso.count(current_date.isoformat())
        value = -1 if isOut else count
        # Prepare the data structure
        year = current_date.year
        if year not in res:
            res[year] = {"series": []}

        # Find the series for the current day_str
        series = next((s for s in res[year]["series"] if s["name"] == day_str), None)
        if not series:
            series = {"name": day_str, "data": []}
            res[year]["series"].append(series)

        # Add the data point
        series["data"].append({"x": week_number_str, "y": value})
        
        # Move to the next day
        current_date += datetime.timedelta(days=1)
    
    return res

def polar(data):
    '''clock data for polar plot
    '''
    df = pd.DataFrame(data)
    df["hour"] = pd.to_datetime(df["timestamp_start"]).dt.floor('h',).dt.hour
    count = df["hour"].value_counts()
    daytime = [12, 13, 14, 15, 16, 17, 18, 7, 8, 9, 10, 11]
    nightime = [0, 1, 2, 3, 4, 5, 6, 19, 20, 21, 22, 23]
    hours_count = (pd.Series(0, index=range(24)) + count).fillna(0)
    
    count_day= hours_count[daytime]
    count_night= hours_count[nightime]

    res = {}
    res['day'] = {
        'keys': list(count_day.keys()),
        'values': list(count_day.values)
    }
    res['night'] = {
        'keys': list(count_night.keys()),
        'values': list(count_night.values)
    }
    
    return res

def add_columns(df, level):
    '''add columns to the dataframe
    '''
    if level == 'sample':
        df['duration'] = (df['timestamp_end'] - df['timestamp_start']).dt.total_seconds()

    if level == 'observation':
        df['duration'] = (df['timestamp_end'] - df['timestamp_start']).dt.total_seconds()

    return df

def timelineAttributes(data, attributes):
    '''add columns to the dataframe
    '''

    df = pd.DataFrame(data)
    df_info = pd.DataFrame(attributes)
    # add extra column for duration
    new_row = {'name': 'duration', 'type': 'number'}
    df_info_augmented = df_info.copy()
    df_info_augmented.loc[len(df_info)] = new_row
    df['date'] = df['timestamp_start'].dt.date

    # convert to number whentype is number (dirty fix for type error in the mock data)
    df_fixed = df.copy()
    for index, row in df_info_augmented.iterrows():
        if row.type == 'number':
            # convert to number (dirty fix for type error in the mock data)
            df_fixed[row['name']] = pd.to_numeric(df[row['name']])
        else:
            df_fixed[row['name']] = df[row['name']]

    # group by date
    grouped = df_fixed.groupby('date')

    # generate all dates between the start and end date
    start_date = df['date'].min()
    end_date = df['date'].max()
    all_dates = pd.date_range(start=start_date, end=end_date).date

    res = {}
    for index, row in df_info_augmented.iterrows():
        if row['type'] == 'number':
            res[row['name']] = {}
            res[row['name']]['data'] = {}
            res[row['name']]['data']['mean'] = grouped[row['name']].mean().reindex(all_dates, fill_value=0).fillna(0).tolist()
            res[row['name']]['type'] = 'continuous'
            res[row['name']]['dates'] = all_dates.tolist()

        else:
            value_counts = grouped[row['name']].value_counts(normalize=True).unstack(fill_value=0).reindex(all_dates, fill_value=0).fillna(0)
            res[row['name']] = {}
            res[row['name']]['data'] = {}

            for value in value_counts.columns:
                res[row['name']]['data'][value] = value_counts[value].tolist()
            res[row['name']]['type'] = 'categorical'
            res[row['name']]['dates'] = all_dates.tolist()
    return res