import express from "express";
import clientesRoutes from "./src/routes/clientesRoutes.js";
import peliculasRoutes from "./src/routes/peliculasRoutes.js";
import empleadosRoutes from "./src/routes/empleadosRoutes.js"; 

const app = express();
app.use(express.json());

app.use("/api/clientes", clientesRoutes);
app.use("/api/peliculas", peliculasRoutes);
app.use("/api/empleados", empleadosRoutes);

export default app;