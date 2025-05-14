import express from "express";
import peliculasRoutes from "./routes/peliculasRoutes.js";

const app = express();
app.use(express.json());

app.use("/api/peliculas", peliculasRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});