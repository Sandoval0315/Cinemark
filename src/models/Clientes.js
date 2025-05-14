import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const Clientes = new Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true
        },
        correo: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Por favor ingresa un correo válido']
        },
        contraseña: {
            type: String,
            required: true,
            minlength: 6
        },
        telefono: {
            type: String, // Cambiado a String para manejar formatos internacionales
            required: true,
            match: [/^[0-9]{10,15}$/, 'Por favor ingresa un teléfono válido']
        },
        direccion: {
            type: String,
            required: true
        },
        activo: {
            type: Boolean,
            required: true,
            default: true
        }
    },
    {
        timestamps: true
    }
);

export default model("Cliente", Clientes);