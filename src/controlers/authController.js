const authBD = require('../bdMysql/authBD');
const cripto = require('../models/criptografia');
const jwt = require('jsonwebtoken');
require("dotenv-safe").load();

module.exports = {
    async loginUser(req, res) {
        const email = await req.body.email;
        const senha = await cripto(req.body.senha);
        authBD.loginUser(res, email, senha);
    },
    async cadastroUser(req, res) {
        const email = await req.body.email;
        const senha = await cripto(req.body.senha);
        authBD.cadastroUser(res, email, senha);
    },

    verificaJWT(req, res, next) {
        var token = req.headers['x-access-token'];
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

        jwt.verify(token, process.env.SECRET, function (err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

            // se tudo estiver ok, salva no request para uso posterior
            req.userId = decoded.id;
            next();
        });
    },
    teste(req, res) {
        console.log('teste');
        res.send("funfou parceiro kkkkkk");
    }

}