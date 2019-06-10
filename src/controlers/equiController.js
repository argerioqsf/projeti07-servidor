const authBD = require('../bdMysql/authBD');
const cripto = require('../models/criptografia');
const reqEsp = require('../models/reqEsp');
const equiBD = require('../bdMysql/equiBD');
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

}