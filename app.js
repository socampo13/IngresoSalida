const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const path = require('path');

// Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' })); // Ajusta el dominio según sea necesario

// Servir archivos estáticos (HTML, CSS, JS, imágenes) desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Conectar a la base de datos SQLite
const db = new sqlite3.Database('./db/registro.db', (err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite');
    }
});

// Ruta para la raíz "/"
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para registrar el ingreso
app.post('/api/registro/ingreso', (req, res) => {
    const { identificacion } = req.body;
    const horaIngreso = new Date().toISOString(); // Hora en formato ISO

    if (!identificacion) {
        return res.status(400).json({ error: 'Falta identificación' });
    }

    const sql = 'INSERT INTO registros (identificacion, horaIngreso) VALUES (?, ?)';
    db.run(sql, [identificacion, horaIngreso], function(err) {
        if (err) {
            console.error('Error al registrar ingreso:', err.message);
            return res.status(500).json({ error: 'Error en la base de datos' });
        }
        res.json({ message: 'Ingreso registrado correctamente. Buen dia!', id: this.lastID });
    });
});

// Ruta para registrar la salida
app.post('/api/registro/salida', (req, res) => {
    const { identificacion } = req.body;
    const horaSalida = new Date().toISOString(); // Hora en formato ISO

    if (!identificacion) {
        return res.status(400).json({ error: 'Falta identificación' });
    }

    // Verificar si hay un registro de ingreso sin salida
    const sqlSelect = 'SELECT horaIngreso FROM registros WHERE identificacion = ? AND horaSalida IS NULL';
    db.get(sqlSelect, [identificacion], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Error al buscar registro de ingreso' });
        }
        if (!row) {
            return res.status(404).json({ error: 'No se encontró un ingreso pendiente para esta identificación' });
        }

        // Calcular el tiempo transcurrido entre ingreso y salida
        const horaIngreso = new Date(row.horaIngreso);
        const diferenciaMs = new Date(horaSalida) - horaIngreso;
        const diferenciaHoras = Math.floor(diferenciaMs / (1000 * 60 * 60)); // Convertir a horas
        const diferenciaMinutos = Math.floor((diferenciaMs % (1000 * 60 * 60)) / (1000 * 60)); // Convertir el resto a minutos

        // Actualizar la hora de salida en la base de datos
        const sqlUpdate = 'UPDATE registros SET horaSalida = ? WHERE identificacion = ? AND horaSalida IS NULL';
        db.run(sqlUpdate, [horaSalida, identificacion], function(err) {
            if (err) {
                return res.status(500).json({ error: 'Error al registrar salida' });
            }
            res.json({
                message: 'Salida registrada correctamente. Que descanses!',
                tiempoTranscurrido: `Tiempo registrado: ${diferenciaHoras} horas y ${diferenciaMinutos} minutos`
            });
        });
    });
});

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000');
});
