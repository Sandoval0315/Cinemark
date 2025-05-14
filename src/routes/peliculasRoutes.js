import express from "express";
import {
  createPelicula,
  getPeliculas,
  getPeliculaById,
  updatePelicula,
  deletePelicula,
} from "../controllers/peliculasController.js";

const router = express.Router();

router.post("/", createPelicula);
router.get("/", getPeliculas);
router.get("/:id", getPeliculaById);
router.put("/:id", updatePelicula);
router.delete("/:id", deletePelicula);

export default router;