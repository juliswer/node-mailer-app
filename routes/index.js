const { Router } = require('express');
const router = Router();

const nodemailer = require('nodemailer');

router.post('/send-email', async (req, res) => {
    const { name, email, phone, message } = req.body;

    contentHTML = `
        <h1>User Information</h1>
        <ul>
            <li>Username: ${name}</li>
            <li>User Email: ${email}</li>
            <li>PhoneNumber: ${phone}</li>
        </ul>
        <p>${message}</p>
    `;

    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "3ecb8219654120",
          pass: "d7115919c2f9e3"
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const sendMail = async () => {
        const transporter = nodemailer.createTrans()
        const info = await transporter.sendMail({
            from: "julian@swerdlin.com",
            to: "julianswer36@gmail.com",
            subject: "Este es un mensaje de prueba",
            // text: "Plaintext version of the message",
            html: contentHTML
        });
        console.log('Message sent: %s', info.messageId);

        return
    }

    /* let info = await transporter.sendMail({
        from: '"FaztTech Server" <testtwo@fazttech.xyz>', // sender address,
        to: 'fazttech@gmail.com',
        subject: 'Website Contact Form',
        // text: 'Hello World'
        html: contentHTML
    }) */

    
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    res.redirect('/success.html');
});

module.exports = router;