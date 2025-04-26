import bcrypt from 'bcrypt';
import connection from '../database.js'; // MySQL connection

// Fetch user by ID
export const getUserById = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE id = ?';
        connection.query(query, [id], (err, results) => {
            if (err) return reject(err);
            if (results.length === 0) return reject('User not found');
            resolve(results[0]);
        });
    });
};

// Fetch all users
export const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users';
        connection.query(query, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

// Create new user
export const createUser = (name, email, password, age) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) return reject(err);

            const query = 'INSERT INTO users (name, email, password, age) VALUES (?, ?, ?, ?)';
            connection.query(query, [name, email, hashedPassword, age], (err, result) => {
                if (err) return reject(err);
                resolve(result.insertId);
            });
        });
    });
};

// Update user details
export const updateUser = (id, name, email, password, age) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) return reject(err);

            const query = 'UPDATE users SET name = ?, email = ?, password = ?, age = ? WHERE id = ?';
            connection.query(query, [name, email, hashedPassword, age, id], (err, result) => {
                if (err) return reject(err);
                if (result.affectedRows === 0) return reject('User not found');
                resolve();
            });
        });
    });
};

// Delete user by ID
export const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM users WHERE id = ?';
        connection.query(query, [id], (err, result) => {
            if (err) return reject(err);
            if (result.affectedRows === 0) return reject('User not found');
            resolve();
        });
    });
};
