from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)

# Load the trained model
with open('ensemble_model.pkl', 'rb') as f:
    model = pickle.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    store = data['store']
    dept = data['dept']
    week = data['week']
    date = data['date']

    # Prepare input data for the model
    input_data = pd.DataFrame({
        'Store': [store],
        'Dept': [dept],
        'Week': [week],
    })

    # Make prediction
    prediction = model.predict(input_data)
    return jsonify({'predicted_sales': prediction[0]})

if __name__ == '__main__':
    app.run(port=5001)
