const formData = require('../formData');
let io = null;
var obj = {
    emit: function(name,valor){
        if(io != null){
            io.emit(name,valor);
        }
    },
    connect: function(http){
        io = require('socket.io')(http);
        io.on('connection', (socket) => {
            socket.on('disconnect', function(){
                var formhora =  formData("hora");
                console.log('[' + formhora + '] disconectou do socket: ' + socket.id);
            });
            var formhora =  formData("hora");
            console.log('[' + formhora + '] conectado ao socket: ' +  socket.id);
        });
    }
}


module.exports = obj;