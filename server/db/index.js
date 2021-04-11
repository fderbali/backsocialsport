const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 10,
    password: '',
    user: 'root',
    database: 'sport_plus',
    host: 'localhost',
    port: '3306'
});

let sport_plus_db = {};
sport_plus_db.all = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM membre`, (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

sport_plus_db.one = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM membre WHERE id = ?`, [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
}

module.exports = sport_plus_db;