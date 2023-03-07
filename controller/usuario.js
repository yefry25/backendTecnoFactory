import Usuario from "../model/usuario.js";

const usuario = {
    crearUsuario : async ( req,res) => {
        const {identificacion,nombre,correo} = req.body
        try {
            const user = new Usuario({identificacion,nombre,correo});
            if(!user){
                return res.status(400).json({msg:"No se pudo crear el usuario"})
            }
            user.save()
            res.json(user)
        } catch (error) {
            return res.status(500).json({msg:"Hable con el WebMaster"})
        }
    },
    verUsuarios: async (req, res) => {
        try {
            const user = await Usuario.find();
            if(!user){
                return res.status(400).json({msg:"No se encontraron usuarios"})
            }
            res.json({user})
        } catch (error) {
            return res.status(500).json({msg:"Hable con el WebMaster"})
        }
    }
}

export default usuario