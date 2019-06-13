const connection = require('../models/connectionMYSQL');
const difHora = require('../models/difHora');
const insertLog = "insert into log values (default, ?, ?, ?, ?)";
const selectLog = "select *from log where id_central_fk = ?";
const sqlUpdateEstado = "update estados_centrais set estado = ? where id_central_fk = ?";
const sqlUltimoEstado = "select estado from estados_centrais where id_estado=?";
const insertEstadoCentral = "insert into estados_centrais values (default, ? , 'null')";

const cadastrarEquipamento = "insert into equipamentos values (?, ?, ?, ?)";
const buscaEquipamento = "select id_equi from equipamentos where id_equi = ?";
const removerEquipamento = "delete from equipamentos where id_equi = ?";
const verificarEquipamento = "select * from equipamentos where id_equi = ?";
const buscaEquipamentos = "select * from equipamentos";
const atualizarEstado = "update equipamentos set estado=? where id_equi=?";


module.exports = {

    cadastrarEqui: function(pin, nome, potencia, res){
       connection.query(buscaEquipamento,[pin], (error, results)=>{
            if(error){

            }else if(results.length == 1){
                console.log("Pino ja esta sendo usado , Falha no cadastro");
                res.json({
                    status:400,
                    description:'Pino já está sendo utilizado.'
                });
            }else if(results.length == 0){
                console.log("cadastrando equipamento");    
                connection.query(cadastrarEquipamento, [pin, nome, potencia, 0], (err, results)=>{
                    if(err){
                        res.json(err);
                    } else {
                        res.json({
                            status:200,
                            description:'Equipamento cadastrado com sucesso.'
                        });
                    }
                });
            }
       });
    },
    removerEqui: function(pin, res){
                 console.log("remover equipamento");    
                 connection.query(removerEquipamento, [pin], (err, results)=>{
                     if(err){
                         res.json(err);
                     } else {
                         res.json({
                             status:200,
                             description:'Equipamento removido com sucesso.'
                         });
                     }
                 });
     },
     verificarEquipamento: function(id_equi){
        console.log("verificarEquipamento");   
        return new Promise((resolve,reject)=>{
            connection.query(verificarEquipamento, [id_equi], (err, results)=>{
                if(err){
                    resolve(err);
                } else {
                    if (results.length > 0) {
                        console.log("Equipamento está cadastrado.");   
                        resolve({
                            status:true,
                            description:'Equipamento está cadastrado.'
                        });
                    }else{
                        console.log("Equipamento não está cadastrado.");   
                        resolve({
                            status:false,
                            description:'Equipamento não está cadastrado.'
                        });
                    }
                }
            });
        });
     },
     attEstado: (id_equi,estado)=>{
        console.log("verificarEquipamento");   
            connection.query(atualizarEstado, [estado,id_equi], (err, results)=>{
                if(err){
                    resolve(err);
                } else {
                        console.log("estado atualizado.");
                }
            });
     },
     equipamentos:()=>{
        console.log("verificarEquipamento");  
        return new Promise((resolve,reject)=>{
            connection.query(buscaEquipamentos, (err, results)=>{
                if(err){
                    resolve(err);
                } else {
                    console.log("Equipamentos encontrados.");   
                    resolve({
                        status:true,
                        description:'Equipamentos encontrados.',
                        data:results
                    });
                }
            });
        });
     }
}