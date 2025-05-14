import { Schema, models } from "mongoose";

const Empleados = new Schema(
    {
        nombre: {
            type: String,
            require: true
        },
        correo: {
            type: String,
            require: true
        },
        contraseña: {
            type: String,
            require: true
        },
        telefono: {
            type: Number,
            require: true
        },
        direccion: {
            type: String,
            require: true
        },
        puesto: {
            type: String,
            require: true
        },
        fecha_contratacion: {
            type: Date,
            require: true
        },
        salario: {
            type: Number,
            require: true
        },
        activo: {
            type: Boolean,
            require: true
        }
    }
)

export default Empleados