var fs = require('fs');
const formData = require('../formData');
var moment = require('moment');
moment.locale('pt-BR');
 
var obj = {
 
    getFileDb: function (path) {
        return  __dirname + '/../saves/'+ path +'.json';
    },
 
    getData: function (path) {
        var db = obj.getFileDb(path);
        var fileContent = fs.readFileSync(db, 'utf8');
        var fileJson = [];
        if (fileContent) {
            fileJson = JSON.parse(fileContent);
        }
        return fileJson;
    },
 
    saveData: function (fileJson,path) {
        var db = obj.getFileDb(path);
        var data = JSON.stringify(fileJson);
        fs.writeFileSync(db, data, 'utf8');
        return data;
    },
 
    readData: function (path) {
        var db = obj.getFileDb(path);
        var fileContent = fs.exists(db, function(exists){
                console.log("exists ",exists);
                return exists;
        });
    
    },
 
    enviarbd: function (formdata,valores,res) {
            obj2.statusEquipamentos(valores.modulo_id,valores.estado);
            formdata = "modulo_"+valores.modulo_id;
            let mes = valores.dia.split("-");
            mes = mes[1]+"-"+mes[2];
            var local = obj.getFileDb(formdata);
            var fileContent = fs.exists(local, function(exists){
            if(exists){
                // formhora =  formData("hora");
                // console.log("[" + formhora + "] O arquivo já existe");
                // formhora =  formData("hora");
                // console.log("[" + formhora + "] Adicionando informações no arquivo: " + formdata + ".json");
                var fileJson = obj.getData(formdata);
                if (!fileJson.registros[mes]) {
                    fileJson.registros[mes] = {consumoTotal:0.00,registros:[]}
                }
                fileJson.registros[mes].registros.push(valores);
                if (valores.estado == 0 ) {
                    let oldData = false;
                    for (let i = 0; i < fileJson.registros[mes].registros.length; i++) {

                        if (fileJson.registros[mes].registros[i].estado == 1 && fileJson.registros[mes].registros[i].modulo_id == valores.modulo_id) {
                            oldData = fileJson.registros[mes].registros[i].dia+" "+fileJson.registros[mes].registros[i].hora;
                        }
                    }
                    if (!oldData) {
                        let mes2 = mes.split('-');
                        if (parseInt(mes2[0])-1 <= 0) {
                            mes2 = " 30-" + mes2[1]-1;
                        }else{
                            mes2 = (parseInt(mes2[0])-1) + "-" + mes2[1];
                        }
                        if (fileJson.registros[mes2]) {
                            for (let i = 0; i < fileJson.registros[mes2].registros.length; i++) {
        
                                if (fileJson.registros[mes2].registros[i].estado == 1 && fileJson.registros[mes2].registros[i].modulo_id == valores.modulo_id) {
                                    oldData = fileJson.registros[mes2].registros[i].dia+" "+fileJson.registros[mes2].registros[i].hora;
                                }
                            }
                        }
                    }
                    if (oldData) {
                        let afterData = valores.dia+" "+valores.hora;
                        console.log("hora antes: ",oldData,", hora depois: ",afterData);
                        let difhora = moment(afterData,"DD-MM-YYYY HH:mm:ss").diff(moment(oldData,"DD-MM-YYYY HH:mm:ss"));
                        console.log("difhora: ",difhora);
                        difhora = moment.duration(difhora).asHours().toFixed(2);
                        console.log("difhora: ",difhora);
                        console.log("potencia: ",valores.potencia);
                        let consumo = (valores.potencia * difhora) / 1000;
                        console.log("consumo1: ",consumo);
                        consumo = parseFloat(consumo.toFixed(2));
                        console.log("consumo2: ",consumo);
                        fileJson.consumoTotal = (parseFloat(fileJson.consumoTotal) + consumo);
                        fileJson.consumoTotal = fileJson.consumoTotal.toFixed(2);
                        fileJson.registros[mes].consumoTotal = fileJson.registros[mes].consumoTotal + consumo;
                        obj.consumo_mes(mes,consumo);
                        // let CP = fileJson["consumoPin"+valores.modulo_id];
                        // console.log("CP: ",CP);
                        // if (CP>=0) {
                        //     console.log("consumoPin ja existe: ",CP);
                        //     CP = (parseFloat(CP) + consumo);
                        //     CP = CP.toFixed(2);
                        //     fileJson["consumoPin"+valores.modulo_id] = CP;
                        // }else{
                        //     console.log("consumoPin não existe");
                        //     fileJson["consumoPin"+valores.modulo_id] = consumo;
                        // }
                        obj.saveData(fileJson,formdata);
                        // formhora =  formData("hora");
                        // console.log("[" + formhora + "] Informações adicionadas no arquivo: " + formdata + ".json");
                        // console.log("[" + formhora + "]  Length do arquivo: " + formdata + ".json: " + fileJson.length);
                         res.json("attDados");
                    }else{
                        obj.saveData(fileJson,formdata);
                        obj.consumo_mes(mes,0.00);
                        // formhora =  formData("hora");
                        // console.log("[" + formhora + "] Informações adicionadas no arquivo: " + formdata + ".json");
                        // console.log("[" + formhora + "]  Length do arquivo: " + formdata + ".json: " + fileJson.length);
                         res.json("attDados");
                    }
                }else{
                    // let mes = valores.dia.split("-");
                    // mes = mes[1]+"-"+mes[2];
                    // obj.consumo_mes(mes,0.00);
                    obj.saveData(fileJson,formdata);
                    // formhora =  formData("hora");
                    // console.log("[" + formhora + "] Informações adicionadas no arquivo: " + formdata + ".json");
                    // console.log("[" + formhora + "]  Length do arquivo: " + formdata + ".json: " + fileJson.length);
                     res.json("attDados");
                }
            }else{
                // formhora =  formData("hora");
                // console.log("[" + formhora + "] o arquivo não existe");
                // formhora =  formData("hora");
                // console.log("[" + formhora + "] Crinado arquivo: " + formdata + ".json");
                // var localEx = obj.getFileDb("DiasCadastrados");
                // var existe = fs.exists(localEx, function(exists){
                //     if (exists) {
                //         var fileJson = obj.getData("DiasCadastrados");
                //         fileJson.registros.push(valores);
                //     }
                // });
                if (valores.estado == 0) {
                    console.log("ainda nao existe registro e foi desligado");
                    //obj.calculoDeHoraFirst(valores,formdata).then(consumo=>{
                        //valores = JSON.stringify(valores);
                        obj.consumo_mes(mes,0.00);
                        valores = `{ "consumoTotal": ${0.00} , "registros":{ "${mes}": { "consumoTotal":0.00,"registros":[ ${JSON.stringify(valores)}] } } }`;
                        valores = JSON.parse(valores);
                        obj.saveData(valores,formdata);
                        // formhora =  formData("hora");
                        // console.log("[" + formhora + "] Arquivo (" + formdata + ".json ) Criado");
                        res.json("newDados");
                    //});
                }else{
                    //valores = JSON.stringify(valores);
                    obj.consumo_mes(mes,0.00);
                    valores = `{ "consumoTotal":${0.00}, "registros":{ "${mes}": { "consumoTotal":0.00,"registros":[ ${JSON.stringify(valores)}] } } }`;
                    valores = JSON.parse(valores);
                    obj.saveData(valores,formdata);
                    // formhora =  formData("hora");
                    // console.log("[" + formhora + "] Arquivo (" + formdata + ".json ) Criado");
                    res.json("newDados");
                }
            }
            });
            //Ct=P*horas/1000
    },
    consumo_mes: function(mes,consumo){
        console.log("consumo_mes: ",consumo);
        var local = obj.getFileDb("consumo_mes");
        var existe = fs.exists(local, function(exists){
            if (exists) {
                var consumo_mes = obj.getData("consumo_mes");
                if (consumo_mes[mes]) {
                    consumo_mes[mes].consumo = consumo_mes[mes].consumo + consumo;
                    consumo_mes[mes].consumo = parseFloat(consumo_mes[mes].consumo.toFixed(2));
                    console.log("add consumo_mes: ",consumo_mes);
                    obj.saveData(consumo_mes,"consumo_mes");
                }else{
                    consumo_mes[mes] = {consumo:0.00};
                    consumo_mes[mes].consumo = consumo_mes[mes].consumo + consumo;
                    consumo_mes[mes].consumo = parseFloat(consumo_mes[mes].consumo.toFixed(2));
                    console.log("add consumo_mes: ",consumo_mes);
                    obj.saveData(consumo_mes,"consumo_mes");
                }
            }
        });
    },
    calculoDeHoraFirst: function(valores,formdata){
        return new Promise((resolve,reject)=>{
            console.log("formdata: ",formdata);
            let data = formdata.split('-');
            data = data[2]+"-"+data[1]+"-"+data[0];
            console.log("data inversa: ",data);
            var format = 'YYYY-MM-DD';
            data = moment(data).format(format);
            console.log("data formatada: ",data);
            let newData = data;
                newData = moment(newData).subtract(1,'day').format('YYYY-MM-DD');
                let dataNew = newData.split('-');
                dataNew = dataNew[2]+"-"+dataNew[1]+"-"+dataNew[0];
                console.log("data menos 1 dia: ",dataNew);
                var local = obj.getFileDb(dataNew);
                console.log("local: ",local);
                var fileContent = fs.exists(local, function(exists){
                    if (exists) {
                        var fileJson = obj.getData(dataNew);
                        console.log("ultimo registro: ",fileJson[fileJson.length-1]);
                        let oldData = dataNew+" "+fileJson[fileJson.length-1].hora;
                        let afterData = formdata+" "+valores.hora;
                        console.log("hora antes: ",oldData,", hora depois: ",afterData);
                        let difhora = moment(afterData,"DD-MM-YYYY HH:mm:ss").diff(moment(oldData,"DD-MM-YYYY HH:mm:ss"));
                        console.log("difhora: ",difhora);
                        difhora = moment.duration(difhora).asHours().toFixed(1);
                        console.log("difhora: ",difhora);
                        console.log("potencia: ",valores.potencia);
                        let consumo = (valores.potencia * difhora) / 1000;
                        consumo = consumo.toFixed(2);
                        console.log("consumo: ",consumo);
                        resolve({consumo});
                    }else{
                        resolve({consumo:0.00});
                    }
                });
        });
    }

 
};

var obj2 = {
    statusEquipamentos: function(modulo_id,status){
        modulo_id = "modulo_"+modulo_id
    console.log("statusEquipamentos: ",modulo_id,", ",status);
    var local = obj.getFileDb("statusEquipamentos");
    var existe = fs.exists(local, function(exists){
        if (exists) {
            var statusEquipamentos = obj.getData("statusEquipamentos");
            if (statusEquipamentos[modulo_id]) {
                statusEquipamentos[modulo_id] = status;
                console.log("add statusEquipamentos: ",status);
                obj.saveData(statusEquipamentos,"statusEquipamentos");
            }else{
                statusEquipamentos[modulo_id] = status;
                console.log("add statusEquipamentos: ",status);
                obj.saveData(statusEquipamentos,"statusEquipamentos");
            }
        }
    });
}
}
 
module.exports = obj;