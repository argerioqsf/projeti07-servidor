const connection = require('../models/connectionMYSQL');

const selectBotoes = 'select *from centrais';

module.exports = {
    botoesBD: function(res){
        connection.query(selectBotoes, (err, results)=>{
            if(err){
                console.log('Erro na busca de botoes');
            } else if(results){
                res.json(results);
            }
        });
    }
}