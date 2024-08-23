const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs');

const app = express();
const port = 30000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Supply Chain API is running');
});

// Endpoint to fetch sales data
app.get('/api/sales', (req, res) => {
    fs.readFile('sales_data.json', 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading sales data:", err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(JSON.parse(data));
    });
});

// Endpoint to get predictions
app.post('/api/predict', async (req, res) => {
    const { store, dept, week } = req.body;

    try {
        const response = await axios.post('http://localhost:5001/predict', {
            store,
            dept,
            week,
            date
        });
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching prediction:", error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
