import { Schema } from "mongoose";

const Clientes = new Schema(
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
        activo: {
            type: Boolean,
            require: true 
        }
    }
)