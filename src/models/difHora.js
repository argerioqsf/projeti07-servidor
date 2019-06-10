const moment = require('moment');

function difHora(result, res) {
    let meses = [];
    let mesesOrdem = [];
    console.log("result: ",result);
    if (result.length > 0) {
        for (let i = 0; i < result.length; i++) {
            let mes = result[i].data.split("-");
            //console.log(mes);
            if (meses[mes[1] + "-" + mes[2]]) {
                //console.log("existe");
                meses[mes[1] + "-" + mes[2]].push({ data: result[i].data, estado: result[i].estado, hora: result[i].hora, id: result[i].id_central_fk });
                //console.log(meses[mes[1]+"-"+mes[2]]);
            } else {
                //console.log("nao existe");
                meses[mes[1] + "-" + mes[2]] = [];
                mesesOrdem.push(mes[1] + "-" + mes[2]);
                meses[mes[1] + "-" + mes[2]].push({ data: result[i].data, estado: result[i].estado, hora: result[i].hora, id: result[i].id_central_fk });
                //console.log(meses[mes[1]+"-"+mes[2]]);
            }
            if (i == result.length - 1) {
                console.log(mesesOrdem);
                let consumo = [];
                for (let j = 0; j < mesesOrdem.length; j++) {
                    console.log("mesOrdem: ", meses[mesesOrdem[j]]);
                    let status = { estado: null };
                    total = 0;
                    for (let k = 0; k < meses[mesesOrdem[j]].length; k++) {
                        let temp = meses[mesesOrdem[j]];
                        console.log("status: ", status);
                        console.log("atual: ", temp[k]);
                        if (status.estado == "ligado") {
                            if (temp[k].estado == "ligado") {
                                if (k == meses[mesesOrdem[j]].length - 1) {
                                    console.log("total: ", total + "min ligados no mes-ano " + mesesOrdem[j]);
                                    consumo.push({ mesAno: mesesOrdem[j], consumo: total });
                                }
                                continue;
                            } else if (temp[k].estado == "desligado") {
                                var a = moment(status.data + " " + status.hora, 'DD-MM-YYYY hh:mm:ss');
                                var b = moment(temp[k].data + " " + temp[k].hora, 'DD-MM-YYYY hh:mm:ss');
                                var diffHours = b.diff(a, 'minutes'); //25
                                console.log("diferença de minutos: ", diffHours);
                                status = { estado: null };
                                total += diffHours;
                                if (k == meses[mesesOrdem[j]].length - 1) {
                                    console.log("total: ", total + "min ligados no mes-ano " + mesesOrdem[j]);
                                    consumo.push({ mesAno: mesesOrdem[j], consumo: total });
                                } else {
                                    continue;
                                }
                            }
                        } else if (status.estado == "desligado") {
                            if (temp[k].estado == "desligado") {
                                if (k == meses[mesesOrdem[j]].length - 1) {
                                    console.log("total: ", total + "min ligados no mes-ano " + mesesOrdem[j]);
                                    consumo.push({ mesAno: mesesOrdem[j], consumo: total });
                                }
                                continue;
                            } else if (temp[k].estado == "ligado") {
                                status = temp[k];
                            }
                        } else {
                            status = temp[k];
                            if (k == meses[mesesOrdem[j]].length - 1) {
                                console.log("total: ", total + "min ligados no mes-ano " + mesesOrdem[j]);
                                consumo.push({ mesAno: mesesOrdem[j], consumo: total });
                            }
                        }
                        console.log("estado: ", temp[k].estado);
                    }
                    if (j == mesesOrdem.length - 1) {
                        console.log("consumo: ", consumo);
                        res.json(consumo);
                    }
                }
            }
        }
    } else {
        res.json([]);
    }

}

module.exports = difHora;