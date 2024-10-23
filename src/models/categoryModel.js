const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

// Create categories table if it doesn't exist
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            type TEXT NOT NULL CHECK (type IN ('income', 'expense'))
        )
    `);
});

// Function to add a new category
const addCategory = (name, type, callback) => {
    const sql = `INSERT INTO categories (name, type) VALUES (?, ?)`;
    db.run(sql, [name, type], function (err) {
        if (err) {
            callback(err);
        } else {
            callback(null, { id: this.lastID, name, type });
        }
    });
};

// Function to get all categories
const getCategories = (callback) => {
    const sql = `SELECT * FROM categories`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            callback(err);
        } else {
            callback(null, rows);
        }
    });
};

// Function to get a category by ID
const getCategoryById = (id, callback) => {
    const sql = `SELECT * FROM categories WHERE id = ?`;
    db.get(sql, [id], (err, row) => {
        if (err) {
            callback(err);
        } else {
            callback(null, row);
        }
    });
};

// Function to delete a category by ID
const deleteCategory = (id, callback) => {
    const sql = `DELETE FROM categories WHERE id = ?`;
    db.run(sql, [id], function (err) {
        if (err) {
            callback(err);
        } else {
            callback(null, { message: 'Category deleted', changes: this.changes });
        }
    });
};

module.exports = {
    addCategory,
    getCategories,
    getCategoryById,
    deleteCategory
};
