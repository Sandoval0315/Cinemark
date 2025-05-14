import express from "express";
import empleadosController from "../controllers/empleadosController.js";

const router = express.Router();

router.get("/", empleadosController.getEmpleados);
router.get("/:id", empleadosController.getEmpleado);
router.post("/", empleadosController.createEmpleado);
router.delete("/:id", empleadosController.deleteEmpleado);
router.put("/:id", empleadosController.updateEmpleado);

export default router;