// backend/src/controllers/transactionController.js
const transactionModel = require('../models/transactionModel');

// Add a new transaction
const createTransaction = (req, res) => {
  const newTransaction = req.body;
  transactionModel.addTransaction(newTransaction, (err) => {
    if (err) return res.status(500).json({ error: 'Failed to add transaction.' });
    res.status(201).json({ message: 'Transaction added successfully!' });
  });
};

// Get all transactions
const getTransactions = (req, res) => {
  transactionModel.getAllTransactions((err, rows) => {
    if (err) return res.status(500).json({ error: 'Failed to retrieve transactions.' });
    res.json(rows);
  });
};

// Get a transaction by ID
const getTransactionById = (req, res) => {
  const id = req.params.id;
  transactionModel.getTransactionById(id, (err, row) => {
    if (err) return res.status(500).json({ error: 'Failed to retrieve transaction.' });
    if (!row) return res.status(404).json({ error: 'Transaction not found.' });
    res.json(row);
  });
};

// Update a transaction by ID
const updateTransaction = (req, res) => {
  const id = req.params.id;
  const updatedTransaction = req.body;
  transactionModel.updateTransactionById(id, updatedTransaction, (err) => {
    if (err) return res.status(500).json({ error: 'Failed to update transaction.' });
    res.json({ message: 'Transaction updated successfully!' });
  });
};

// Delete a transaction by ID
const deleteTransaction = (req, res) => {
  const id = req.params.id;
  transactionModel.deleteTransactionById(id, (err) => {
    if (err) return res.status(500).json({ error: 'Failed to delete transaction.' });
    res.json({ message: 'Transaction deleted successfully!' });
  });
};

module.exports = {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction
};
