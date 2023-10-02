const express = require('express');
const cors = require('cors'); 
const nodemailer = require('nodemailer');

const app = express();

// Usar el middleware 'cors'
app.use(cors({ origin: true }))// por defecto cualquier origen funciona en nuestra api
app.use(express.json());

// Ruta para el endpoint de ping
app.get('/ping', (req, res) => {
    console.log(`ping`);
    res.status(200).send('pong')
});

app.post('/enviar-correo', (req, res) => {
    console.log(req.body, 'REQEST')

    const { addresse, subject, message } = req.body;
    const from = addresse; 

    // Configura el transporter de nodemailer
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'rengav6174@gmail.com',
            pass: 'vsty nobp gbzm kcgu', /* contraseña para aplicaciones segura */
        },
    });

    // Configura los datos del correo electrónico
    const mailOptions = {
        from: from,
        to: 'rengav6174@gmail.com',
        subject: subject,
        text: message + '\n' + from,
    };

    // Envía el correo electrónico
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error al enviar el correo electrónico');
        } else {
            console.log('Correo electrónico enviado: ' + info.response);
            res.status(200).send('Correo electrónico enviado con éxito');
        }
    });
})


const port = process.env.PORT || 3001

app.listen(port, () => {
    console.log(`Server on port ${port}`) // mensaje en consola luego de levantar el servidor
})