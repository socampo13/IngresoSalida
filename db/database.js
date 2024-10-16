const sqlite = require('sqlite3').verbose();

//Conectar a la base de datos
const db = new sqlite.Database('./db/registro.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Conectado a la base de datos');
});

// Crear la tabla si no existe
db.run(`CREATE TABLE IF NOT EXISTS registros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    identificacion TEXT NOT NULL,
    horaIngreso TEXT NOT NULL,
    horaSalida TEXT
  )`);

module.exports = db;