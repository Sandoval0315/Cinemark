import express from "express";
import clientesController from "../controllers/clientesController.js"; 

const router = express.Router();

router.get("/", clientesController.getClientes);
router.get("/:id", clientesController.getCliente);
router.post("/", clientesController.createCliente);
router.delete("/:id", clientesController.deleteCliente);
router.put("/:id", clientesController.updateCliente);

export default router;