import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
    const [items, setItems] = useState([{ name: '', quantity: 1, price: 0 }]);
    const [totalCost, setTotalCost] = useState(0);
    const [thankYouMessage, setThankYouMessage] = useState('');  // State for thank you message

    const handleChange = (index, event) => {
        const values = [...items];
        values[index][event.target.name] = event.target.value;
        setItems(values);
    };

    const addItem = () => {
        if (items.length < 10) {
            setItems([...items, { name: '', quantity: 1, price: 0 }]);
        } else {
            alert("You can only add up to 10 items.");
        }
    };

    const removeItem = (index) => {
        const values = [...items];
        values.splice(index, 1);
        setItems(values);
    };

    const calculateTotal = async () => {
        const response = await axios.post('http://localhost:5000/calculate', { items });
        setTotalCost(response.data.totalCost);
        setThankYouMessage("Thank you for using the Bill Calculator!");  // Show thank you message
    };

    return (
        <div className="container">
            <h1 className="header">Bill Calculator</h1>
            {items.map((item, index) => (
                <div key={index} className="item-form">
                    <div className="input-group">
                        <label className="label">Item Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter item name"
                            value={item.name}
                            onChange={event => handleChange(index, event)}
                            className="input"
                        />
                    </div>
                    <div className="input-group">
                        <label className="label">Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            min="1"
                            value={item.quantity}
                            onChange={event => handleChange(index, event)}
                            className="input"
                        />
                    </div>
                    <div className="input-group">
                        <label className="label">Price</label>
                        <input
                            type="number"
                            name="price"
                            min="0"
                            value={item.price}
                            onChange={event => handleChange(index, event)}
                            className="input"
                        />
                    </div>
                    <button onClick={() => removeItem(index)} className="remove-button">Remove</button>
                </div>
            ))}
            <button onClick={addItem} className="button">Add Item</button>
            <button onClick={calculateTotal} className="button calculate">Calculate Total</button>
            <h2 className="total-cost">Total Cost: ₹{totalCost.toFixed(2)}</h2>
            {thankYouMessage && <div className="thank-you">{thankYouMessage}</div>} {/* Thank you message */}
        </div>
    );
};

export default App;
