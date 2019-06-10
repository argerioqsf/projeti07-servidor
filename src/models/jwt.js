require("dotenv-safe").load();
const jwt = require('jsonwebtoken');

module.exports = {
    jwtAuthentication:function(email){
        return token = jwt.sign({data: email}, process.env.SECRET, {expiresIn: '1h'});
    }
}