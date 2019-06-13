const authBD = require('../bdMysql/authBD');
const cripto = require('../models/criptografia');
const reqEsp = require('../models/reqEsp');
const equiBD = require('../bdMysql/equiBD');
const bdJson = require('../bdJson/bdJson');
const formData = require('../formData');
const jwt = require('jsonwebtoken');
const socket = require('../socket/socket-io.js');

module.exports = {
    async AddEquipamento(req, res) {
        const pin = await req.body.pin;
        const nome = await req.body.nome;
        //authBD.loginUser(res, email, senha);
        console.log('AddEquipamento: pin ( ',pin,' ) - nome ( ',nome,' )');
        const data = {
            pinName:nome,
            pinNumber:pin
        }
        equiBD.verificarEquipamento(pin).then(resp=>{
            if (resp.status == false) {
                reqEsp.addEquiEsp(data,res,req).then(response=>{
                    console.log("equiadd resp esp: ",response);
                    if (response.potencia >= 0 ) {
                        equiBD.cadastrarEqui(pin,nome,response.potencia,res);
                    }else{
                        res.json({
                            status:400,
                            description:'Potencia do equipamento nao encontrada.'
                        });
                    }
                });
            }else{
                console.log(resp.description);
                res.json({
                    status:409,
                    description:resp.description
                });
            }
        });
    },
    async RmEquipamento(req, res) {
        const pin = await req.body.pin;
        //authBD.loginUser(res, email, senha);
        console.log('RmEquipamento: pin ( ',pin,' )');
        const data = {
            pinNumber:pin
        }
        reqEsp.rmEquiEsp(data,res,req).then(response=>{
            console.log("conecção feita co mo esp");
            if (response) { 
                var formdata = formData("data");
                equiBD.removerEqui(pin,res);
            }
        },error=>{
            console.log("Tentativa de acessar esp falhada espController: ",res);
        });
    },
    async DWEsp(req, res) {
        console.log('DigitalWriteEquipamento controller');
        const pin = await req.body.pin;
        const valor = await req.body.valor;
        //authBD.loginUser(res, email, senha);
        console.log('Digital Write equi: pin ( ',pin,' ), valor ( ',valor,' )');
        const data = {
            pinNumber:pin,
            pinValue:valor
        }
        equiBD.verificarEquipamento(pin).then(resp=>{
            if (resp.status == true) {
                reqEsp.DigitalWriteEsp(data,res,req).then(response=>{
                    console.log("conexão feita com o esp");
                    if (response) {
                        var formhora = formData("hora");
                        var formdata = formData("data");
                        let valores = {
                            modulo_id:pin,
                            hora:formhora,
                            dia:formdata,
                            potencia:response.potencia,
                            estado:valor
                        };
                        socket.emit("status",valores);
                        bdJson.enviarbd(formdata,valores,res);
                    }
                },error=>{
                    console.log("Tentativa de acessar esp falhada espController: ",res);
                });
            }else{
                console.log(resp.description);
                res.json({
                    status:409,
                    description:resp.description
                });
            }
        });
    },
    equipamentos: (req,res)=>{
        console.log('equipamentos controller');
        equiBD.equipamentos().then(response=>{
            console.log('equipamentos retornados: ',response.data);
            if (response.status == true) {
                console.log('equipamentos retornados 2: ',response.data);
                res.json(response.data);
            }
        });
    },
    consumoUnitario: async(req,res)=>{
        console.log('consumoUnitario controller');
        const pin = await req.body.pin;
        const mes = await req.body.mes;

    },
    consumoMensal:async(req,res)=>{
        console.log('consumoUnitario controller');
        const pin = await req.body.pin;
    },
    estadoEquipamento: async (req, res)=>{
        console.log('estadoEquipamento controller');
        const body = await req.body;
        console.log('body controller: ',body); 
        res.send("ok");
    }
    
    

}