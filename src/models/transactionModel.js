// backend/src/models/transactionModel.js
const db = require('../config/db');

const createTransactionTable = () => {
  db.run(`CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    category TEXT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    date TEXT NOT NULL,
    description TEXT
  )`);
};

const addTransaction = (transaction, callback) => {
  const { type, category, amount, date, description } = transaction;
  db.run(`INSERT INTO transactions (type, category, amount, date, description)
          VALUES (?, ?, ?, ?, ?)`, [type, category, amount, date, description], callback);
};

const getAllTransactions = (callback) => {
  db.all(`SELECT * FROM transactions`, [], callback);
};

const getTransactionById = (id, callback) => {
  db.get(`SELECT * FROM transactions WHERE id = ?`, [id], callback);
};

const updateTransactionById = (id, transaction, callback) => {
  const { type, category, amount, date, description } = transaction;
  db.run(`UPDATE transactions
          SET type = ?, category = ?, amount = ?, date = ?, description = ?
          WHERE id = ?`, [type, category, amount, date, description, id], callback);
};

const deleteTransactionById = (id, callback) => {
  db.run(`DELETE FROM transactions WHERE id = ?`, [id], callback);
};

module.exports = {
  createTransactionTable,
  addTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransactionById,
  deleteTransactionById
};
