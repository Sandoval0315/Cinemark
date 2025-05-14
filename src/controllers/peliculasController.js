import { Schema, models, startSession } from "mongoose";
const Pelicula = models.Peliculas || model("Peliculas", PeliculasSchema); // Asegúrate de que el modelo esté registrado

const handleError = (res, error, statusCode = 500) => {
  console.error(error);
  res.status(statusCode).json({ error: error.message });
};

export const createPelicula = async (req, res) => {
  const session = await startSession();
  session.startTransaction();

  try {
    const { titulo, description, director, genero, año, duracion, imagen } = req.body;
    const pelicula = new Pelicula({titulo,description,director,genero,año,duracion,imagen,});
    await pelicula.save({ session });
    await session.commitTransaction();
    res.status(201).json(pelicula);
  } catch (error) {
    await session.abortTransaction();
    handleError(res, error, 400); 
  } finally {
    session.endSession();
  }
};

export const getPeliculas = async (req, res) => {
  try {
    const peliculas = await Pelicula.find();
    res.status(200).json(peliculas);
  } catch (error) {
    handleError(res, error);
  }
};

export const getPeliculaById = async (req, res) => {
  try {
    const pelicula = await Pelicula.findById(req.params.id);
    if (!pelicula) {
      return res.status(404).json({ error: "Película no encontrada" });
    }
    res.status(200).json(pelicula);
  } catch (error) {
    handleError(res, error);
  }
};

export const updatePelicula = async (req, res) => {
  const session = await startSession();
  session.startTransaction();
  try {
    const updatedPelicula = await Pelicula.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, session } 
    );
    if (!updatedPelicula) {
      await session.abortTransaction();
      return res.status(404).json({ error: "Película no encontrada" });
    }
    await session.commitTransaction();
    res.status(200).json(updatedPelicula);
  } catch (error) {
    await session.abortTransaction();
    handleError(res, error, 400);
  } finally {
    session.endSession();
  }
};

export const deletePelicula = async (req, res) => {
  const session = await startSession();
  session.startTransaction();

  try {
    const deletedPelicula = await Pelicula.findByIdAndDelete(req.params.id, { session });

    if (!deletedPelicula) {
      await session.abortTransaction();
      return res.status(404).json({ error: "Película no encontrada" });
    }

    await session.commitTransaction();
    res.status(200).json({ message: "Película eliminada correctamente" });
  } catch (error) {
    await session.abortTransaction();
    handleError(res, error);
  } finally {
    session.endSession();
  }
};