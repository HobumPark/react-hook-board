var mysql = require('mysql');
const db = mysql.createPool({
    host : 'mynodetest.cafe24app.com',
    user : 'phbnode',
    password : 'ghqja880',
    database : 'phbnode',
    port:3306
});

module.exports = db;