import Favorito from "../model/favorito.js";

const favorito = {
    crearFavorito: async (req, res) => {
        const { usuario, comicFav } = req.body;
        try {
            const fav = new Favorito({ usuario, comicFav });
            if (!fav) {
                return res.status(400).json({ msg: "No se pudo guardar tu comic favorito" })
            }

            try {
                const favo = await Favorito.find();
                for (let i = 0; i < favo.length; i++) {
                    const element = favo[i];
                    /* console.log("codigo comic: "+element.comicFav); */
                    if (element.comicFav == comicFav) {
                        if (element.usuario.equals(usuario)) {
                            return res.status(500).json({msg:"usuario ya tiene un comic registrado como favorito"})
                        }
                    }
                }
            } catch (error) {
                return res.status(500).json({ msg: "No se pudo verificar si tu comic favorito ya estaba registrado" })
            }
            fav.save();
            res.json({ fav })
        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    },
    verFavoritos: async (req, res) => {
        try {
            const fav = await Favorito.find();
            if (!fav) {
                return res.status(400).json({ msg: "No se encontraron comics favoritos" })

            }
            res.json({ fav })
        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    },
    filtrarFavUsuario: async function (req, res) {
        const { id } = req.params
        try {
            const fav = await Favorito.find({ usuario: id })
            if (!fav) {
                return res.status(400).json({ msg: "No se encontro los favoritos del usuario" })
            }
            res.json(fav)
        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    }
}

export default favorito