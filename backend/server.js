const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/calculate', (req, res) => {
    const { items } = req.body; // Expecting an array of { name, quantity, price }
    let totalCost = 0;

    items.forEach(item => {
        totalCost += item.quantity * item.price;
    });

    res.json({ totalCost });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
