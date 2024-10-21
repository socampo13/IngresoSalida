const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
/* const nodemailer = require('nodemailer'); */

// Conectar a la base de datos
const db = new sqlite3.Database('./db/registro.db', (err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite');
    }
});

// Configurar el transporte de Nodemailer
/* const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'correo@gmail.com',
        pass: 'contraseña'
    }
});

// Función para enviar correos
function enviarCorreo(identificacion, email, accion) {
    const mailOptions = {
        from: 'correo@gmail.com',
        to: email,
        subject: `Registro de ${accion}`,
        text: `La persona con ID ${identificacion} ha registrado su ${accion} correctamente.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            return console.log('Error al enviar el correo:', error);
        }
        console.log('Correo enviado: ' + info.response);
    });
} */

// Ruta para registrar ingreso
router.post('registro/ingreso', (req, res) => {
    const { identificacion, email } = req.body;
    const horaIngreso = new Date().toISOString();

    if (!identificacion || !email) {
        return res.status(400).json({ error: 'Falta identificación o correo electrónico' });
    }

    const sql = 'INSERT INTO registros (identificacion, email, horaIngreso) VALUES (?, ?)';
    db.run(sql, [identificacion, email, horaIngreso], function(err) {
        if (err) {
            return res.status(500).json({ error: 'Error al registrar ingreso' });
        }

        // Enviar correo de configuración de ingreso
        /* enviarCorreo(identificacion, email, 'ingreso'); */

        res.json({ message: 'Ingreso registrado correctamente' });
    });
});

// Ruta para registrar la salida
router.post('registro/salida', (req, res) => {
    const { identificacion, email } = req.body;
    const horaSalida = new Date().toISOString();

    if (!identificacion || !email) {
        return res.status(400).json({ error: 'Falta identificación o correo electrónico' });
    }

    const sql = 'UPDATE registros SET horaSalida = ? WHERE identificacion = ? AND email = ? AND horaSalida IS NULL';
    db.run(sql, [horaSalida, identificacion, email], function(err) {
        if (err) {
            return res.status(500).json({ error: 'Error al registrar salida' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'No se encontró un ingreso pendiente para esta identificación' });
        }

        // Enviar correo de configuración de salida
        /* enviarCorreo(identificacion, email, 'salida'); */

        res.json({ message: 'Salida registrada correctamente' });
    });
});

module.exports = router;
