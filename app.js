import express from "express";
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import "./database.js";
import clientesRoutes from "./src/routes/clientesRoutes.js";
import peliculasRoutes from "./src/routes/peliculasRoutes.js";
import empleadosRoutes from "./src/routes/empleadosRoutes.js"; 
import registerClientsRoutes from "./src/routes/registerClientRoutes.js";
import registerEmployeesRoutes from "./src/routes/registerEmployeesRoutes.js";
import loginRoutes from "./src/routes/loginRoutes.js";
import logOutRoutes from "./src/routes/logOutRoutes.js";
import passwordRecoveryRoutes from "./src/routes/passwordRecovery.js";



const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/clientes", clientesRoutes);
app.use("/api/peliculas", peliculasRoutes);
app.use("/api/empleados", empleadosRoutes);

app.use("/api/registerClient", registerClientsRoutes);
app.use("/api/registerEmplooyes", registerEmployeesRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/logout", logOutRoutes);
app.use("/api/passwordRecovery", passwordRecoveryRoutes);

export default app;