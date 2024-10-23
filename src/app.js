// backend/src/app.js
const express = require('express');
const transactionRoutes = require('./routes/transactionRoutes');
const summaryRoutes = require('./routes/summaryRoutes');

const app = express();

app.use(express.json());

// Define your routes here
app.use('/api/transactions', transactionRoutes);  // Transactions routes
app.use('/api/summary', summaryRoutes);  // Summary routes

// Add a default route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Personal Expense Tracker API');
});

module.exports = app;  // Export the app
