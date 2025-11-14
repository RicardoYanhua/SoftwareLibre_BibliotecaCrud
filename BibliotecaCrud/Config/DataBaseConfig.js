const mysql = require('mysql2');
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '123456',
  database: process.env.DB_NAME || 'db_node_biblioteca',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
const promisePool = pool.promise();
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Error al conectar con la base de datos:', err.message);
    console.error('Base de datos:', process.env.DB_NAME);
  } else {
    console.log('✅ Conexión exitosa con la base de datos:', process.env.DB_NAME);
    connection.release();
  }
});
module.exports = promisePool;


