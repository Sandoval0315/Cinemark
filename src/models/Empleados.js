import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const Empleados = new Schema(
    {
        nombre: {
            type: String,
            required: true
        },
        correo: {
            type: String,
            required: true,
            unique: true
        },
        contraseña: {
            type: String,
            required: true
        },
        telefono: {
            type: Number,
            required: true
        },
        direccion: {
            type: String,
            required: true
        },
        puesto: {
            type: String,
            required: true
        },
        fecha_contratacion: {
            type: Date,
            required: true,
            default: Date.now
        },
        salario: {
            type: Number,
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

export default model("Empleado", Empleados);