import { Router } from "express";
import { check } from "express-validator";
import validarCampos from "../middleware/midleware.js";
import favorito from "../controller/favorito.js"

const router = Router();

router.post('/',[
    check('usuario', "El campo usuario no puede estar vacio").not().isEmpty(),
    check('usuario','El campo Usuario debe ser mongoId').isMongoId(),
    check('comicFav','El campo comic favorito no puede estar vacio').not().isEmpty(),
    validarCampos
],favorito.crearFavorito)

router.get('/verFavoritos',favorito.verFavoritos),

router.get('/filtrarFav/:id',[
    check('id','El campo id debe ser mongoId').isMongoId(),
    check('id','El campo id no puede estar vacio').not().isEmpty(),
    validarCampos
],favorito.filtrarFavUsuario)

export default router