import express from "express";
import peliculasController from "../controllers/peliculasController.js";

const router = express.Router();

router.get("/", peliculasController.getPeliculas);
router.get("/:id", peliculasController.getPelicula);
router.post("/", peliculasController.createPelicula);
router.delete("/:id", peliculasController.deletePelicula);
router.put("/:id", peliculasController.updatePelicula);

export default router;