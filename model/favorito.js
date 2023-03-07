import mongoose from 'mongoose';

const favoritoSchema = new mongoose.Schema({

    usuario:{
        type:mongoose.Types.ObjectId,
        ref:'Usuario',
        required:true
    },
    comicFav:{
        type:String,
        required:true
    }
}, {
    timestamps: true
})

export default mongoose.model('Favorito', favoritoSchema)