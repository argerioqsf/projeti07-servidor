const connection = require('../models/connectionMYSQL');
const jwtAuthentication = require('../models/jwt');
const loginUser = "select email, senha from usuarios where email=? and senha=?";
const buscaEmail = "select email from usuarios where email = ?";
const sqlCadastro = "INSERT INTO usuarios VALUES (default,?,?)";

module.exports = {
    loginUser: function(res, email, senha){
        connection.query(loginUser, [email, senha], (err, results)=>{
            if(err){
                console.log("erro na busca de login");
                res.json(err);
            }
            if(results.length == 1){
                console.log('Logado');
                //res.json(true, token);
                res.json({
                    estado: true,
                    token: jwtAuthentication.jwtAuthentication(email)
                });
            } else {
                console.log('Nao cadastrado');
                res.json(false);
            }
        });
    },

    cadastroUser: function (res, email, senha){        
        connection.query(buscaEmail, [email], function(error, results){
            if(error){
                console.log("erro na busca do cadastro");
                res.json(error);
            } else if(results.length == 1){
                console.log("Usuario existe, Falha no cadastro");
                res.json("emailExiste");
            } else if(results.length == 0){
                console.log("cadastrando usuario");                
                connection.query(sqlCadastro, [email, senha], function(error, results){
                    if(error){
                        console.log("erro no cadastro");
                        res.json(error);
                    } else{
                        console.log("Usuario novo cadastrado");
                        res.json({
                            estado: true,
                            token: jwtAuthentication.jwtAuthentication(email)
                        });
                    }
                });
            }
        });
    }
}
