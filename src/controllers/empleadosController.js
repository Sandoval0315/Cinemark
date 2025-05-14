const empleadosController = {};
import Empleado from "../models/Empleados.js";

// SELECT (Obtener todos los empleados)
empleadosController.getEmpleados = async (req, res) => {
  const empleados = await Empleado.find();
  res.json(empleados);
};

// SELECT BY ID (Obtener un empleado por ID)
empleadosController.getEmpleado = async (req, res) => {
  const empleado = await Empleado.findById(req.params.id);
  if (!empleado) {
    return res.status(404).json({ message: "Empleado no encontrado" });
  }
  res.json(empleado);
};

// INSERT (Crear empleado)
empleadosController.createEmpleado = async (req, res) => {
  const { nombre, correo, contraseña, telefono, direccion, puesto, fecha_contratacion, salario } = req.body;
  const newEmpleado = new Empleado({
    nombre,
    correo,
    contraseña,
    telefono,
    direccion,
    puesto,
    fecha_contratacion,
    salario,
    activo: true // Por defecto activo
  });
  await newEmpleado.save();
  res.json({ message: "Empleado guardado" });
};

// DELETE (Eliminar empleado)
empleadosController.deleteEmpleado = async (req, res) => {
  const deletedEmpleado = await Empleado.findByIdAndDelete(req.params.id);
  if (!deletedEmpleado) {
    return res.status(404).json({ message: "Empleado no encontrado" });
  }
  res.json({ message: "Empleado eliminado" });
};

// UPDATE (Actualizar empleado)
empleadosController.updateEmpleado = async (req, res) => {
  const { nombre, correo, contraseña, telefono, direccion, puesto, fecha_contratacion, salario, activo } = req.body;
  await Empleado.findByIdAndUpdate(
    req.params.id,
    {
      nombre,
      correo,
      contraseña,
      telefono,
      direccion,
      puesto,
      fecha_contratacion,
      salario,
      activo
    },
    { new: true } // Devuelve el documento actualizado
  );
  res.json({ message: "Empleado actualizado" });
};

export default empleadosController;