const mysql = require('mysql')

const db = mysql.createConnection({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "password",
    database: "library"
});

module.exports = db;