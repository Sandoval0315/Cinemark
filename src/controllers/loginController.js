import Cliente from "../models/Clientes.js";
import Empleado from "../models/Empleados.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config.js";

const loginController = {};

loginController.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let userFound;
    let userType;

    // Verificación de Admin desde config
    if (
      email === config.emailAdmin.email &&
      password === config.emailAdmin.password
    ) {
      userType = "admin";
      userFound = { _id: "admin" };
    } else {
      // Buscar primero en empleados
      userFound = await Empleado.findOne({ email });
      userType = "empleado";

      if (!userFound) {
        // Buscar en clientes si no es empleado
        userFound = await Cliente.findOne({ email });
        userType = "cliente";
      }
    }

    if (!userFound) {
      console.log("Usuario no encontrado en ninguna colección");
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (userType !== "admin") {
      const isMatch = await bcryptjs.compare(password, userFound.password);
      if (!isMatch) {
        console.log("Contraseña incorrecta");
        return res.status(401).json({ message: "Contraseña incorrecta" });
      }
    }

    // Crear token JWT
    jwt.sign(
      { id: userFound._id, userType },
      config.JWT.secret,
      { expiresIn: config.JWT.expiresIn },
      (err, token) => {
        if (err) {
          console.error("Error al generar token:", err);
          return res.status(500).json({ message: "Error en el servidor" });
        }

        res.cookie("authToken", token);
        res.json({ message: "Inicio de sesión exitoso" });
      }
    );
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export default loginController;
