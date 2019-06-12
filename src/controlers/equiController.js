const authBD = require('../bdMysql/authBD');
const cripto = require('../models/criptografia');
const reqEsp = require('../models/reqEsp');
const equiBD = require('../bdMysql/equiBD');
const bdJson = require('../bdJson/bdJson');
const formData = require('../formData');
const jwt = require('jsonwebtoken');

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
        reqEsp.addEquiEsp(data,res,req).then(response=>{
            if (response.potencia) {
                equiBD.cadastrarEqui(pin,nome,response.potencia,res);
            }else{
                res.json({
                    status:400,
                    description:'Potencia do equipamento nao encontrada.'
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
                bdJson.enviarbd(formdata,valores,res);
            }
        },error=>{
            console.log("Tentativa de acessar esp falhada espController: ",res);
        });
    }

}