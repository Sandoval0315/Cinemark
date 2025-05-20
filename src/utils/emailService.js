import nodemailer from "nodemailer";
import { config } from "../config.js";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: config.email.email_user,
    pass: config.email.email_pass,
  },
});

const sendRecoveryEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: '"Cinemark Soporte" <sandovalnelson1503@gmail.com>"',
      to,
      subject,
      text,
      html,
    });
    return info;
  } catch (error) {
    console.log("Error email" + console.error);
  }
};

const HTMLRecoveryEmail = (code) => {
    return `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Recuperación de contraseña</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f0f2f5;
            margin: 0;
            padding: 0;
            color: #ffffff;
          }
          .container {
            max-width: 600px;
            margin: 50px auto;
            background-color: #ffffff;
            padding: 40px 30px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          }
          h2 {
            color: #2c3e50;
            text-align: center;
            margin-bottom: 20px;
          }
          p {
            font-size: 16px;
            line-height: 1.6;
            color: #555;
            margin-bottom: 20px;
          }
          .code {
            display: block;
            width: fit-content;
            margin: 30px auto;
            font-size: 28px;
            font-weight: bold;
            background-color: #3498db;
            color: white;
            padding: 15px 30px;
            border-radius: 8px;
            letter-spacing: 3px;
            text-align: center;
          }
          .footer {
            text-align: center;
            font-size: 13px;
            color: #888;
            margin-top: 40px;
          }
          .logo {
            display: block;
            margin: 0 auto 30px;
            max-width: 120px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <img src="https://1000marcas.net/wp-content/uploads/2022/12/Cinemark-Logo-thmb.png" alt="Logo" class="logo" />
          <h2>¿Olvidaste tu contraseña?</h2>
          <p>Hemos recibido una solicitud para restablecer tu contraseña. Por favor, usa el siguiente código para continuar con el proceso:</p>
          <div class="code">${code}</div>
          <p>Este código es válido por <strong>2 horas</strong>. Si no solicitaste esta acción, puedes ignorar este correo.</p>
          <div class="footer">
            &copy; ${new Date().getFullYear()} Cinemark. Todos los derechos reservados.
          </div>
        </div>
      </body>
      </html>
    `;
  };
  

export { sendRecoveryEmail, HTMLRecoveryEmail };
