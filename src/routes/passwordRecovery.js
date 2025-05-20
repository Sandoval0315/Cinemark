import express from "express";
import recoverPasswordController from "../controllers/passwordRecoveryController.js";

const router = express.Router();
router.route("/requestCode").post(recoverPasswordController.solicitarCodigo);
router.route("/verifyCode").post(recoverPasswordController.verificarCodigo);
router.route("/newPassword").post(recoverPasswordController.actualizarPassword);


export default router;
