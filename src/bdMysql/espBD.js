const connection = require('../models/connectionMYSQL');
const difHora = require('../models/difHora');
const insertLog = "insert into log values (default, ?, ?, ?, ?)";
const selectLog = "select *from log where id_central_fk = ?";
const sqlUpdateEstado = "update estados_centrais set estado = ? where id_central_fk = ?";
const sqlUltimoEstado = "select estado from estados_centrais where id_estado=?";
const insertCentral = "insert into centrais values (default, ?, ?)";
const insertEstadoCentral = "insert into estados_centrais values (default, ? , 'null')";

module.exports = {

    insertLog: function(id_central, data, hora, estado, res){
        connection.query(insertLog, [id_central, data, hora, estado], (err, results)=>{
            if(err){
                res.json(err);
            } else {

            }
        })
    },

    selectLog: function(id_central, res){
        connection.query(selectLog, [id_central], (err, results)=>{
            if(err){
                res.json(err);
            } else {
                //res.json(results);
                difHora(results,res);
            }
        })
    },
    
    insertUltimoEstado: function(id, estado, res){
        connection.query(sqlUpdateEstado, [estado, id], (err, results)=>{
            if(err){
                res.json(err);
            } else {
                
            }
        })        
    },

    recuperarUltimoEstado: function(id, res){
        connection.query(sqlUltimoEstado, [id], (err, results)=>{
            if(err){
                res.json(err);
            } else {
                res.json(results);
            }
        });
    },

    cadastroCentral(nome_central, potencia_central, res){
        connection.query(insertCentral, [nome_central, potencia_central], (err, results)=>{
            if(err){
                res.json(err);
            } else{
                connection.query(insertEstadoCentral, [results.insertId], (err, results)=>{
                    if(err){
                        res.json(err);
                    } else {
                        console.log("Nova central cadastrada no banco");
                        res.json(true);
                    }
                })
            }
        });
    }
}