import jwt from "jsonwebtoken";
import Usuario from "../model/usuario.js"

const validar = {

    generarJWT: (uid) => {
        const payload = { uid };
        const tok = jwt.sign(payload, process.env.CLAVESECRET, {
            expiresIn: "4h"//4h
        })
        return tok
    },
}

export default validar