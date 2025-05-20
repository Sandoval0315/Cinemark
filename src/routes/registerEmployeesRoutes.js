import express from "express";
import registerEmployeesController from "../controllers/registerEmployeesController.js";

const router = express.Router();

router.post("/register", registerEmployeesController.register);

export default router;
