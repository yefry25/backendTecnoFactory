import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
    identificacion: {
        type: Number,
        required: true,
        unique: true
    },
    nombre: { 
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    }
}, {
    timestamps: true 
})

export default mongoose.model('Usuario', usuarioSchema)