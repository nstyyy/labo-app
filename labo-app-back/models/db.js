const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'laboratoire',
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connecté !');
});

module.exports = db;