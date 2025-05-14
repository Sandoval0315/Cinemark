const clientesController = {};
import Cliente from "../models/Clientes.js";

clientesController.getClientes = async (req, res) => {
  const clientes = await Cliente.find();
  res.json(clientes);
};

clientesController.getCliente = async (req, res) => {
  const cliente = await Cliente.findById(req.params.id);
  if (!cliente) {
    return res.status(404).json({ message: "Cliente no encontrado" });
  }
  res.json(cliente);
};

clientesController.createCliente = async (req, res) => {
  const { nombre, correo, contraseña, telefono, direccion, activo } = req.body;
  const nuevoCliente = new Cliente({
    nombre,
    correo,
    contraseña,
    telefono,
    direccion,
    activo
  });
  await nuevoCliente.save();
  res.json({ message: "Cliente guardado" });
};

clientesController.deleteCliente = async (req, res) => {
  const clienteEliminado = await Cliente.findByIdAndDelete(req.params.id);
  if (!clienteEliminado) {
    return res.status(404).json({ message: "Cliente no encontrado" });
  }
  res.json({ message: "Cliente eliminado" });
};

clientesController.updateCliente = async (req, res) => {
  const { nombre, correo, contraseña, telefono, direccion, activo } = req.body;
  await Cliente.findByIdAndUpdate(
    req.params.id,
    {
      nombre,
      correo,
      contraseña,
      telefono,
      direccion,
      activo
    },
    { new: true }
  );
  res.json({ message: "Cliente actualizado" });
};

export default clientesController;