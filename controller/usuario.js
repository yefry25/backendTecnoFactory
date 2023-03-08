import Usuario from "../model/usuario.js";
import bcryptjs from "bcryptjs"
import validar from "../middleware/validar.js"

const usuario = {
    crearUsuario: async (req, res) => {
        const { identificacion, nombre, correo,password } = req.body
        try {
            const user = new Usuario({ identificacion, nombre, correo, password });

            try {
                const salt = bcryptjs.genSaltSync(10);
                user.password = bcryptjs.hashSync(password, salt);
            } catch (error) {
                return res.status(500).json({ msg: "No se pudo encriptar la contraseña" })
            }

            if (!user) {
                return res.status(400).json({ msg: "No se pudo crear el usuario" })
            }
            user.save()
            res.json(user)
        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    },
    verUsuarios: async (req, res) => {
        try {
            const user = await Usuario.find();
            if (!user) {
                return res.status(400).json({ msg: "No se encontraron usuarios" })
            }
            res.json({ user })
        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    },
    loginUsuario: async (req, res) => {
        const { password, email } = req.body
        try {
            const user = await Usuario.findOne({ correo:email });
            if (!user) {
                return res.status(400).json({ msg: "Password / correo incorrectos" })
            }

            const validPassword = bcryptjs.compareSync(password,user.password)
            if(!validPassword) {
                return res.status(400).json({ msg: "Password / correo incorrectos"})
            }

            let token=""
            try {
                token = await validar.generarJWT(user.id);
            } catch (error) {
                return res.status(500).json({msg:"Error al crear el token"})
            }

            res.json({user,token})
        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    }
}

export default usuario