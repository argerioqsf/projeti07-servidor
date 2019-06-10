const crypto = require('crypto');

//dados da criptografia
const criptografia_dados = {
    algoritmo: 'aes256',
    segredo: 'asd123',
    tipo: 'hex'
}

function criptografar(senha_criptografada){
    const cypher = crypto.createCipher(criptografia_dados.algoritmo, criptografia_dados.segredo);
    cypher.update(senha_criptografada);
    return cypher.final(criptografia_dados.tipo);
}

module.exports = criptografar;