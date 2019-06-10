function formData(tipo){
    var data = new Date();
    var dia = data.getDate();
    if(dia < 10){
        dia = "0"+dia;
    } 
    var mes = data.getMonth() + 1;
    if(mes < 10){
        mes = "0"+mes;
    }
    var ano = data.getFullYear();
    var hora = data.getHours();
    if(hora < 10 || hora == 0){
        hora = "0"+hora;
    }
    var min = data.getMinutes();
    if(min < 10 || min == 0){
        min = "0"+min;
    }
    var seg = data.getSeconds();
    if(seg < 10 || seg == 0){
        seg = "0"+seg;
    }
    var Horas = hora + ":" + min + ":" + seg;
    var Datacompleta = dia + '-' + mes + '-' + ano;

    if(tipo == 'hora'){
        return Horas;
    } else if(tipo == 'data'){
        return Datacompleta;
    }

}

module.exports = formData;