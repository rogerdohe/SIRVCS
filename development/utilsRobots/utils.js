var mysql = require('mysql');

var sql = 'SELECT * FROM USUARIOS LIMIT 10';


var sirvcs_db = {hostSQL: 'mondragonarquitectos.com.mx' , User: 'mondrago_tesis' , Pass: 'tesis2019' , db: 'mondrago_SIRVCS', port: '3306' };

function createConnection(dbConn){
	connection = mysql.createConnection({
		host     : dbConn.hostSQL,
  		user     : dbConn.User,
  		password : dbConn.Pass,
  		database : dbConn.db,
  		port     : dbConn.port
	});
	return connection;
};

function closeConnection(conn){
	con.destroy();
};

function verifyConnection(){

}

function insertDataBots(conn){
	var query = conn.query(sql, function(error){
    console.log(query.sql);
    if(error){    
    	console.log("[mysql error]",err);
    }   
 });
};