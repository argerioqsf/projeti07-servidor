const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'projeti06'
});

connection.connect(err =>{
    if(err){
        console.log('Falha no banco');
    } else {
        console.log('Conectado ao mysql');
    }
})

module.exports = connection;