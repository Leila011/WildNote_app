import numpy as np

def replace_nan(data, replacement_value=0):
        """
        Recursively replace NaN values in any structure with the specified replacement value.
        
        Parameters:
        - data: The input data structure (e.g., dict, list, tuple, set, or scalar).
        - replacement_value: The value to replace NaN values with (default is 0).
        
        Returns:
        - The data structure with NaN values replaced.
        """
        if isinstance(data, dict):
            return {k: replace_nan(v, replacement_value) for k, v in data.items()}
        elif isinstance(data, list):
            return [replace_nan(item, replacement_value) for item in data]
        elif isinstance(data, tuple):
            return tuple(replace_nan(item, replacement_value) for item in data)
        elif isinstance(data, set):
            return {replace_nan(item, replacement_value) for item in data}
        elif isinstance(data, (int, float)) and np.isnan(data):
            return replacement_value
        else:
            return data

