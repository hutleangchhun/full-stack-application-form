import db from '../database.js';

export const insertMessage = (name, email, message, callback) => {
    const sql = 'INSERT INTO messages (name, email, message) VALUES (?, ?, ?)';
    db.query(sql, [name, email, message], callback);
};
