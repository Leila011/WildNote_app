import pandas as pd
import numpy as np
import datetime

experimentData = [{'experiment_id': 1, 'status': 'completed', 'timestamp_start': datetime.datetime(2024, 12, 1, 8, 0), 'timestamp_end': datetime.datetime(2024, 12, 1, 18, 0), 'name': 'Monkey Forest Study', 'description': 'Mock data of a study of money-human interactions in a monkey forest setting'}]

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
        #description[row['name']['missing_values_nb']] = df.locdf[:,row['name']].isna().sum()
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

    # get range from a monday to a sunday
    start_dt_weekday_nb= start_dt.weekday() 
    end_dt_weekday_nb = end_dt.weekday()
    start_dt_monday = start_dt if start_dt_weekday_nb == 0 else start_dt - pd.Timedelta(days=start_dt_weekday_nb)
    end_dt_sunday = end_dt if end_dt_weekday_nb == 6 else end_dt + pd.Timedelta(days=6-end_dt_weekday_nb)

    # Convert unique dates to ISO format strings
    #unique_dates_iso = [date.isoformat() for date in df['date'].unique()]
    dates_iso = [date.isoformat() for date in df['date']]

  # Initialize calendarData structure
    unique_years = df['year'].unique()
    calendarData = {}
    for year in unique_years:
        calendarData[str(year)] = {
            "series": [{"name": day, "data": []} for day in ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]]
        }

    # loop through all dates in the range
    while start_dt_monday <= end_dt_sunday:
        year = start_dt_monday.year
        #hasSamples = start_dt_monday.isoformat() in (unique_dates_iso) # check if date has samples
        nbSamples = dates_iso.count(start_dt_monday.isoformat())
        weekday = start_dt_monday.strftime("%A") # monday, tuesday, ...
        weekdayNumber = start_dt_monday.weekday()  # Get the weekday as an integer (Monday=1, Sunday=7)
        weekNumberYear = start_dt_monday.isocalendar().week  # Get the ISO week number
        # add date to the serie coresponding to its weekday
        res = {
                'x': "W"+str(weekNumberYear),
                'y': nbSamples
            }
        calendarData[str(year)]["series"][weekdayNumber]["data"].append(res)
        #calendarData[year][weekdayNumber]["name"] = weekday

        start_dt_monday += pd.Timedelta(days=1)  # Corrected: use pd.Timedelta to increment the date


    return calendarData