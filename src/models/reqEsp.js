const http = require('http');
const formData = require('../models/tempo');
const espBD = require('../bdMysql/espBD');

module.exports = {
    addEquiEsp(datta, resp, request){
        return new Promise((resolve,reject)=>{
            const data = JSON.stringify(datta);
            const options = {
                hostname: '192.168.2.140',
                port: 80,
                path: '/addPin',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': data.length
                }                        
            }
            if (false) {
                const req = http.request(options, (res)=>{
                    if(res.statusCode == 200){
                        //request.io.emit('status', true); //enviando via socket
                        console.log("Tentativa de acessar esp feita com sucesso: "+res);
                        res.on('data', (chunk) => {
                            resolve({
                                potencia:chunk.potencia
                            });
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
                    console.log("Tentativa de acessar esp falhada: ",res);
                    reject(error);
            
                });
                req.write(data);
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
                    'Content-Type': 'application/json',
                    'Content-Length': data.length
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
            const options = {
                hostname: '192.168.2.140',
                port: 80,
                path: '/digitalWrite',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': data.length
                }                        
            }
            if (false) {
                const req = http.request(options, (res)=>{
                    if(res.statusCode == 200){
                        //request.io.emit('status', true); //enviando via socket
                        console.log("esp acessado com sucesso: "+res);
                        res.on('data', (chunk) => {
                            resolve({
                                potencia:chunk.potencia
                            });
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
                    console.log("Tentativa de acessar esp falhada: ",res);
                    reject(error);
            
                });
                req.write(data);
                req.end();
            }else{
                resolve({
                    potencia:35.22
                });
            }
        });
    }

};