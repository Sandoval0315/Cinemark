import Empleado from "../models/Empleados.js";
import bcryptjs from "bcryptjs"; 
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";

const registerEmployeesController = {};

registerEmployeesController.register = async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    address,
    role,
    hireDate,
    salary,
    active
  } = req.body;

  try {
    const existEmployee = await Empleado.findOne({ email });
    if (existEmployee) {
      return res.json({ message: "El empleado ya está registrado" });
    }

    // Encriptar la contraseña
    const passwordHash = await bcryptjs.hash(password, 10);

    // Crear nuevo empleado
    const newEmployee = new Empleado({
      name,
      email,
      password: passwordHash,
      phone,
      address,
      role,
      hireDate,
      salary,
      active
    });

    await newEmployee.save();

    jsonwebtoken.sign(
      { id: newEmployee._id },
      config.JWT.secret,
      { expiresIn: config.JWT.expiresIn },
      (error, token) => {
        if (error) console.error("Error al generar token:", error);
        res.cookie("authToken", token);
        res.json({ message: "Empleado registrado correctamente" });
      }
    );
  } catch (error) {
    console.error("Error en el registro de empleado:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export default registerEmployeesController;
