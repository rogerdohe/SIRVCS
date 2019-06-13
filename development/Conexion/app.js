var mysql      = require('mysql');

var sql = 'SELECT * FROM USUARIOS LIMIT 10';

var connection = mysql.createConnection({
  host     : 'mondragonarquitectos.com.mx',
  user     : 'mondrago_tesis',
  password : 'tesis2019',
  database : 'mondrago_SIRVCS',
  port     :3306
});


connection.connect(function(error){
   if(error){
      throw error;
   }else{
      console.log('Conexion correcta.');
   }
});

var query = connection.query('INSERT INTO USUARIOS (idUsuario, nombre, apellidoPaterno, apellidoMaterno, email) VALUES(?, ?, ?, ?, ?)', ['null', 'Roger', 'Dominguez', 'Hernandez', 'rogerdohe@gmail.com'], function(error, result){
   //console.log(query);
   if(error){

        connection.on('error', function(err) {
          console.log("[mysql error]",err);
        });
   }else{
      console.log(result);
   }
 }
);

connection.end(function(err) {
  console.log("\nLa conexion fue cerrada con exito");
});
