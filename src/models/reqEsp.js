const http = require('http');
const formData = require('../models/tempo');
const espBD = require('../bdMysql/espBD');

module.exports = {
    addEquiEsp(datta, resp, request){
        return new Promise((resolve,reject)=>{
            if (true) {
                const req = http.get(`http://192.168.2.140/addPin?pinName=${datta.pinName}&pinNumber=${datta.pinNumber}`, (res)=>{
                    if(res.statusCode == 200){
                        //request.io.emit('status', true); //enviando via socket
                        res.setEncoding('utf8');
                        res.on('data', (chunk) => {
                            console.log("Tentativa de acessar esp feita com sucesso: ",chunk);
                            let potencia = JSON.parse(chunk)
                            resolve(potencia);
                        });
                    } else if(res.statusCode == 404){
                        console.log("Tentativa de acessar esp falhada: "+res.statusMessage);
                        resolve(false);
                    }else{
                        console.log("Tentativa de acessar esp falhada: "+res.statusMessage);
                        resolve(false);
                    }
                });               
                req.on('error', (error)=>{
                    console.error(error);
                    resp.json({
                        status:400,
                        description:'tentativa de conexão com o esp falhada.'
                    });
                    console.log("Tentativa de acessar esp falhada: ",res);
                    reject(error);
            
                }); 
                req.end();
            }else{
                resolve({
                    potencia:22.44
                });
            }
        });
    },
    rmEquiEsp(datta, resp, request){
        return new Promise((resolve,reject)=>{
            const data = JSON.stringify(datta);
            const options = {
                hostname: '192.168.2.140',
                port: 80,
                path: '/removePin',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }                        
            }
            if (false) {
                const req = http.request(options, (res)=>{
                    if(res.statusCode == 200){
                        //request.io.emit('status', true); //enviando via socket
                        console.log("Tentativa de acessar esp feita com sucesso: "+res);
                        resolve(true);
                    } else if(res.statusCode == 404){
                        console.log("Tentativa de acessar esp falhada: "+res);
                        resolve(false);
                    }
                });               
                req.on('error', (error)=>{
                    console.error(error);
                    resp.json({
                        status:400,
                        description:'tentativa de conexão com o esp falhada.'
                    });
                    console.log("Tentativa de acessar esp falhada: ",res);
                    reject(error);
            
                });
                req.write(data);
                req.end();
            }else{
                resolve(true);
            }
        });
    },
    DigitalWriteEsp(datta, resp, request){
        return new Promise((resolve,reject)=>{
            const data = JSON.stringify(datta);
            if (true) {
                const req = http.get(`http://192.168.2.140/digitalWrite?pinNumber=${datta.pinNumber}&pinValue=${datta.pinValue}`, (res)=>{
                    if(res.statusCode == 200){
                        //request.io.emit('status', true); //enviando via socket
                        res.setEncoding('utf8');
                        res.on('data', (chunk) => {
                            console.log("Tentativa de acessar esp feita com sucesso: ",chunk);
                            let potencia = JSON.parse(chunk);
                            resolve(potencia);
                        });
                    } else if(res.statusCode == 404){
                        console.log("Tentativa de acessar esp falhada: "+res);
                        resolve(false);
                    }
                });               
                req.on('error', (error)=>{
                    console.error(error);
                    resp.json({
                        status:400,
                        description:'tentativa de conexão com o esp falhada.'
                    });
                    console.log("Tentativa de acessar esp falhada: ",error);
                    reject(error);
            
                });
                req.end();
            }else{
                resolve({
                    potencia:35.22
                });
            }
        });
    }

};