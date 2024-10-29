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
        location_new = []
        for loc in location_temp:
            new_loc = loc.split("_")[1]
            location_new.append(new_loc)
        __locations = location_new
        # __locations = __data_columns[3:] # Assumes locations start at index 3

    # Load the model
    with open("./artifacts/banglore_home_prices_model.pickle", "rb") as f:
        __model = pickle.load(f)
    print("Loading Saved Artifacts ... Done")


def predict_price(location, sqft, bath, bhk):
    # Ensure that location exists in x.columns
    if location in __locations:
        loc_index = __data_columns.index(location.lower())
    else:
        loc_index = -1  # Set a default value if the location is not found

    # Initialize a new array of zeros with the same length as x.columns
    new_array = np.zeros(len(__data_columns))
    new_array[0] = sqft  # Set sqft at index 0
    new_array[1] = bath  # Set bath at index 1
    new_array[2] = bhk  # Set bhk at index 2

    # Set location column to 1 if it exists
    if loc_index >= 0:
        new_array[loc_index] = 1

    # Predict the price using the trained model
    return round(__model.predict([new_array])[0], 2)


if __name__ == "__main__":
    load_saved_artifacts()
    print(get_location_names())
    print(predict_price("location_1st block jayanagar", 1000, 3, 3))
    print(predict_price("location_2nd stage nagarbhavi", 1000, 3, 3))
    print(predict_price("location_7th phase jp nagar", 1000, 2, 2))
    print(predict_price("location_giri nagar", 1000, 2, 2))
