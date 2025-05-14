import { Schema, models, startSession } from "mongoose";

const Peliculas = new Schema (
    {
        titulo: {
            type: String,
            require: true
        },
        description: {
            type: String,
            require: true
        },
        director: {
            type: String,
            require: true
        },
        genero: {
            type: Array,
            require: true
        },
        año: {
            type: Number,
            require: true
        },
        duracion: {
            type: Number, 
            require: true
        },
        imagen: {
            type: String,
            require: true
        }
    }
)

export default model("Peliculas", Peliculas);