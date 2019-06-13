const express = require('express');

const routes = express.Router();

const authController = require('./controlers/authController');

const espController = require('./controlers/espController');

const equiController = require('./controlers/equiController');


routes.post('/login', authController.loginUser); // login usuario

routes.post('/cadastro', authController.cadastroUser); // cadastro usuario

routes.get('/teste', authController.teste); // teste

routes.post('/AddEquipamento', authController.verificaJWT, equiController.AddEquipamento); // adicionar equipamento

routes.post('/RmEquipamento', authController.verificaJWT, equiController.RmEquipamento); // remove equipamento

routes.post('/estadoRele', authController.verificaJWT, equiController.DWEsp); // ligar ou desligar um equipamento

routes.get('/equipamentos', authController.verificaJWT, equiController.equipamentos); // retorna todos os equipamentos cdastrados

routes.post('/consumoMensal', authController.verificaJWT,equiController.consumoMensal); // seleciona a central com seus dados

routes.post('/consumoUnitario', authController.verificaJWT, equiController.consumoUnitario);

routes.post('/estadoEquipamento', equiController.estadoEquipamento);



module.exports = routes;