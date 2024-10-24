import json
import pickle
import numpy as np

__locations = None
__data_columns = None
__model = None


def get_location_names():
    return __locations


def load_saved_artifacts():
    print("Loading Saved Artifacts ... Start")
    global __data_columns
    global __locations
    global __model

    with open("./artifacts/columns.json", "r") as f:
        __data_columns = json.load(f)["data_columns"]
        __locations = __data_columns[3:]

    with open("./artifacts/banglore_home_prices_model.pickle", "+rb") as f:
        __model = pickle.load(f)
    print("Loading Saved Artifacts ... Done")


if __name__ == "__main__":
    load_saved_artifacts()
    print(get_location_names())
