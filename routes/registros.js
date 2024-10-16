const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

// Conectar a la base de datos
const db = new sqlite3.Database('./db/registro.db', (err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite');
    }
});

// Ruta para registrar ingreso
router.post('registro/ingreso', (req, res) => {
    const { identificacion } = req.body;
    const horaIngreso = new Date().toISOString();

    if (!identificacion) {
        return res.status(400).json({ error: 'Falta identificación' });
    }

    const sql = 'INSERT INTO registros (identificacion, horaIngreso) VALUES (?, ?)';
    db.run(sql, [identificacion, horaIngreso], function(err) {
        if (err) {
            return res.status(500).json({ error: 'Error al registrar ingreso' });
        }
        res.json({ message: 'Ingreso registrado correctamente' });
    });
});

// Ruta para registrar la salida
router.post('registro/salida', (req, res) => {
    const { identificacion } = req.body;
    const horaSalida = new Date().toISOString();

    if (!identificacion) {
        return res.status(400).json({ error: 'Falta identificación' });
    }

    const sql = 'UPDATE registros SET horaSalida = ? WHERE identificacion = ? AND horaSalida IS NULL';
    db.run(sql, [horaSalida, identificacion], function(err) {
        if (err) {
            return res.status(500).json({ error: 'Error al registrar salida' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'No se encontró un ingreso pendiente para esta identificación' });
        }
        res.json({ message: 'Salida registrada correctamente' });
    });
});

module.exports = router;
