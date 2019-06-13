var utils = require('./../utilsRobots/utils');
var mysql = require('mysql');

var sirvcs_db = {hostSQL: 'mondragonarquitectos.com.mx' , User: 'mondrago_tesis' , Pass: 'tesis2019' , db: 'mondrago_SIRVCS', port: '3306' };

var connSIRVCS = utils.createConnection(sirvcs_db.db);

prueba();

function prueba(){
utils.insertDataBots(connSIRVCS);   
}

