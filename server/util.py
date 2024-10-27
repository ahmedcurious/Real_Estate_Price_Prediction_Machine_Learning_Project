import json
import pickle
import numpy as np

__locations = None
__data_columns = None
__model = None

def get_location_names():
    # Check if locations are loaded; if not, load them
    if __locations is None:
        load_saved_artifacts()
    return __locations

def load_saved_artifacts():
    print("Loading Saved Artifacts ... Start")
    global __data_columns
    global __locations
    global __model

    # Load columns and locations
    with open("./artifacts/columns.json", "r") as f:
        __data_columns = json.load(f)["data_columns"]
        location_temp = __data_columns[3:]
        location_new=[]
        for loc in location_temp:
            new_loc = loc.split('_')[1]
            location_new.append(new_loc)
        __locations = location_new
        # __locations = __data_columns[3:] # Assumes locations start at index 3

    # Load the model
    with open("./artifacts/banglore_home_prices_model.pickle", "rb") as f:
        __model = pickle.load(f)
    print("Loading Saved Artifacts ... Done")

if __name__ == "__main__":
    load_saved_artifacts()
    print(get_location_names())
