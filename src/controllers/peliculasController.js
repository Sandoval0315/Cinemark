const peliculasController = {};
import Pelicula from "../models/Peliculas.js";

// OBTENER TODAS LAS PELÍCULAS
peliculasController.getPeliculas = async (req, res) => {
  const peliculas = await Pelicula.find();
  res.json(peliculas);
};

// OBTENER UNA PELÍCULA POR ID
peliculasController.getPelicula = async (req, res) => {
  const pelicula = await Pelicula.findById(req.params.id);
  if (!pelicula) {
    return res.status(404).json({ message: "Película no encontrada" });
  }
  res.json(pelicula);
};

// CREAR NUEVA PELÍCULA
peliculasController.createPelicula = async (req, res) => {
  const { titulo, description, director, genero, año, duracion, imagen } = req.body;
  const nuevaPelicula = new Pelicula({
    titulo,
    description,
    director,
    genero,
    año,
    duracion,
    imagen
  });
  await nuevaPelicula.save();
  res.json({ message: "Película guardada" });
};

// ELIMINAR PELÍCULA
peliculasController.deletePelicula = async (req, res) => {
  const peliculaEliminada = await Pelicula.findByIdAndDelete(req.params.id);
  if (!peliculaEliminada) {
    return res.status(404).json({ message: "Película no encontrada" });
  }
  res.json({ message: "Película eliminada" });
};

// ACTUALIZAR PELÍCULA
peliculasController.updatePelicula = async (req, res) => {
  const { titulo, description, director, genero, año, duracion, imagen } = req.body;
  await Pelicula.findByIdAndUpdate(
    req.params.id,
    {
      titulo,
      description,
      director,
      genero,
      año,
      duracion,
      imagen
    },
    { new: true }
  );
  res.json({ message: "Película actualizada" });
};

export default peliculasController;