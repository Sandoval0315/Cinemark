import express from "express";
import registerClientsController from "../controllers/registerClientController.js";

const router = express.Router();

router.post("/register", registerClientsController.register);
router.post("/verify-email", registerClientsController.verifyCodeEmail);

export default router;
