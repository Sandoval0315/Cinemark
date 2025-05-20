import express from "express";
import logInController from "../controllers/loginController.js";
const router = express.Router();

router.route("/").post(logInController.login);

export default router;
