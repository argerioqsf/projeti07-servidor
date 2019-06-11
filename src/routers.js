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

routes.post('/estadoRele', authController.verificaJWT, equiController.DWEsp); // ligar ou desligar central

routes.get('/equipamentos', authController.verificaJWT, espController.botoesCentrais); // botoes com o nome das centrais

routes.get('/consumoMensal', espController.selecionaCentral); // seleciona a central com seus dados

routes.get('/consumoUnitario', authController.verificaJWT, espController.ultimoEstado);

module.exports = routes;