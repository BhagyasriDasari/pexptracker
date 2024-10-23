// backend/src/controllers/summaryController.js
const transactionModel = require('../models/transactionModel');

const getSummary = (req, res) => {
  transactionModel.getAllTransactions((err, transactions) => {
    if (err) return res.status(500).json({ error: 'Failed to retrieve transactions.' });
    
    const summary = transactions.reduce((acc, transaction) => {
      if (transaction.type === 'income') {
        acc.totalIncome += transaction.amount;
      } else {
        acc.totalExpenses += transaction.amount;
      }
      return acc;
    }, { totalIncome: 0, totalExpenses: 0 });
    
    summary.balance = summary.totalIncome - summary.totalExpenses;
    
    res.json(summary);
  });
};

module.exports = { getSummary };
