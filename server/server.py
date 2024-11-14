from flask import Flask, jsonify, request
from flask_cors import CORS
import util

app = Flask(__name__)

CORS(app)

@app.route("/get_location_names")
def get_location_names():
    response = jsonify(
        {
            "locations": util.get_location_names(),
        }
    )
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


@app.route("/predict_price", methods=["POST"])
def predict_price():
    data = request.get_json()
    print("Received data:", data)
    total_sqft = float(data["total_sqft"])
    location = data["location"]
    bhk = int(data["bhk"])
    bath = int(data["bath"])

    response = jsonify(
        {"estimated_price": util.predict_price(location, total_sqft, bhk, bath)}
    )
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


if __name__ == "__main__":
    print("Starting Python Flask Server For Home Price Prediction...")
    util.load_saved_artifacts()  # Load artifacts before starting the server
    app.run()
