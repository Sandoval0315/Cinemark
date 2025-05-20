import jsonwebtoken from "jsonwebtoken"; 
import bcryptjs from "bcryptjs"; 
import nodemailer from "nodemailer"; 
import crypto from "crypto"; 

import client from "../models/Clientes.js";
import { config } from "../config.js";

const registerClientsController = {};

registerClientsController.register = async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    address,
    active
  } = req.body;

  try {
    const existingClient = await client.findOne({ email });
    if (existingClient) {
      return res.json({ message: "Client already exists" });
    }

    const passwordHash = await bcryptjs.hash(password, 10);
    const newClient = new client({
        name,
        email,
        password : passwordHash,
        phone,
        address,
        active,
    });

    await newClient.save();

    const verificationCode = crypto.randomBytes(3).toString('hex');

    const tokenCode = jsonwebtoken.sign(
      { email, verificationCode },
      config.JWT.secret,
      { expiresIn: "2h" }
    );

    res.cookie("verificationToken", tokenCode, { maxAge: 2 * 60 * 60 * 1000 });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.email.email_user,
        pass: config.email.email_pass,
      },
    });

    const mailOptions = {
      from: config.email.email_user,
      to: email,
      subject: "Verificación de correo",
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #eef2f7; padding: 40px;">
          <div style="max-width: 600px; margin: auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
            <h2 style="color: #1a1aff; text-align: center;">Verificación de correo</h2>
            <p style="font-size: 16px; color: #333;">
              ¡Hola! Gracias por registrarte. Para completar el proceso, por favor utiliza el siguiente código de verificación:
            </p>
            <div style="text-align: center; margin: 30px 0;">
              <span style="display: inline-block; font-size: 24px; color: white; background-color: #cc0000; padding: 15px 25px; border-radius: 5px; letter-spacing: 2px;">
                ${verificationCode}
              </span>
            </div>
            <p style="font-size: 14px; color: #555; text-align: center;">
              Este código expira en <strong>2 horas</strong>.
            </p>
            <p style="font-size: 14px; color: #999; text-align: center;">
              Si no solicitaste este código, puedes ignorar este mensaje.
            </p>
          </div>
        </div>
      `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.json({ message: "Error sending email" + error });
      }
      console.log("Email sent" + info);
    });

    res.json({
      message: "Client registered, Please verify your email with the code sent",
    });
  } catch (error) {
    console.log("error" + error);
  }
};

registerClientsController.verifyCodeEmail = async (req, res) => {
  const { requireCode } = req.body;

  const token = req.cookies.verificationToken;

  try {
    const decoded = jsonwebtoken.verify(token, config.JWT.secret);
    const { verificationCode: storedCode } = decoded;

    if (requireCode !== storedCode) {
      return res.json({ message: "Invalid code" });
    }
    res.clearCookie("verificationToken");

    res.json({ message: "Email verified Successfully" });
  } catch (error) {
    console.log("error" + error);
  }
};

export default registerClientsController;
