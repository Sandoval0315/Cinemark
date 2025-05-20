import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"; 
import Cliente from "../models/Clientes.js";
import Empleado from "../models/Empleados.js";
import { config } from "../config.js";
import { sendRecoveryEmail } from "../utils/Emailservice.js"; 

const passwordRecoveryController = {};

passwordRecoveryController.solicitarCodigo = async (req, res) => {
  const { correo } = req.body;

  try {
    let usuario;
    let tipoUsuario;

    // Buscar en clientes primero
    usuario = await Cliente.findOne({ correo });
    if (usuario) {
      tipoUsuario = "cliente";
    } else {
      // Si no es cliente, buscar en empleados
      usuario = await Empleado.findOne({ correo });
      if (usuario) {
        tipoUsuario = "empleado";
      }
    }

    if (!usuario) {
      return res.status(404).json({ 
        success: false,
        message: "Usuario no encontrado" 
      });
    }

    // Generar código de 5 dígitos
    const codigo = Math.floor(10000 + Math.random() * 90000).toString();

    // Crear token JWT
    const token = jwt.sign(
      { correo, codigo, tipoUsuario, verificado: false },
      config.JWT_SECRET,
      { expiresIn: "20m" } // 20 minutos de expiración
    );

    // Configurar cookie
    res.cookie("tokenRecuperacion", token, { 
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 20 * 60 * 1000 // 20 minutos
    });

    // Enviar correo
    await sendRecoveryEmail(
      correo,
      "Código de recuperación - Cinemark",
      `Tu código de verificación es: ${codigo}`
    );

    res.status(200).json({ 
      success: true,
      message: "Código de verificación enviado" 
    });
  } catch (error) {
    console.error("Error en solicitarCodigo:", error);
    res.status(500).json({ 
      success: false,
      message: "Error al procesar la solicitud" 
    });
  }
};

passwordRecoveryController.verificarCodigo = async (req, res) => {
  const { codigo } = req.body;

  try {
    const token = req.cookies.tokenRecuperacion;

    if (!token) {
      return res.status(400).json({ 
        success: false,
        message: "Token no proporcionado" 
      });
    }

    // Verificar token
    const decodificado = jwt.verify(token, config.JWT_SECRET);
    
    if (decodificado.codigo !== codigo) {
      return res.status(400).json({ 
        success: false,
        message: "Código inválido" 
      });
    }

    // Crear nuevo token marcado como verificado
    const nuevoToken = jwt.sign(
      {
        correo: decodificado.correo,
        codigo: decodificado.codigo,
        tipoUsuario: decodificado.tipoUsuario,
        verificado: true,
      },
      config.JWT_SECRET,
      { expiresIn: "20m" }
    );

    // Actualizar cookie
    res.cookie("tokenRecuperacion", nuevoToken, { 
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 20 * 60 * 1000
    });

    res.status(200).json({ 
      success: true,
      message: "Código verificado correctamente" 
    });
  } catch (error) {
    console.error("Error en verificarCodigo:", error);
    res.status(500).json({ 
      success: false,
      message: "Error al verificar el código" 
    });
  }
};

passwordRecoveryController.actualizarPassword = async (req, res) => {
  const { nuevaContraseña } = req.body;

  try {
    const token = req.cookies.tokenRecuperacion;

    if (!token) {
      return res.status(400).json({ 
        success: false,
        message: "Token no proporcionado" 
      });
    }

    // Verificar token
    const decodificado = jwt.verify(token, config.JWT_SECRET);

    if (!decodificado.verificado) {
      return res.status(400).json({ 
        success: false,
        message: "Código no verificado, no se puede restablecer la contraseña" 
      });
    }

    const { correo, tipoUsuario } = decodificado;

    // Encriptar nueva contraseña
    const hashContraseña = await bcrypt.hash(nuevaContraseña, 10);

    // Actualizar según tipo de usuario
    let usuarioActualizado;
    if (tipoUsuario === "cliente") {
      usuarioActualizado = await Cliente.findOneAndUpdate(
        { correo },
        { contraseña: hashContraseña },
        { new: true }
      );
    } else if (tipoUsuario === "empleado") {
      usuarioActualizado = await Empleado.findOneAndUpdate(
        { correo },
        { contraseña: hashContraseña },
        { new: true }
      );
    }

    // Limpiar cookie
    res.clearCookie("tokenRecuperacion");

    res.status(200).json({ 
      success: true,
      message: "Contraseña actualizada exitosamente" 
    });
  } catch (error) {
    console.error("Error en actualizarPassword:", error);
    res.status(500).json({ 
      success: false,
      message: "Error al actualizar la contraseña" 
    });
  }
};

export default passwordRecoveryController;