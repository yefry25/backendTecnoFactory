import { Router } from "express";
import { check } from "express-validator";
import validarCampos from "../middleware/midleware.js";
import usuario from "../controller/usuario.js"

const router = Router();

router.post('/',[
    check('identificacion','El campo identificación no puede estar vacio').not().isEmpty(),
    check('identificacion','El campo identificación debe ser numérico').isNumeric(),
    check('nombre','El campo nombre no puede estar vacio').not().isEmpty(),
    check('correo','El campo correo no puede estar vacio').not().isEmpty(),
    check('correo','El campo correo debe tener formato email').isEmail(),
    check('password','El campo contraseña no puede estar vacio').not().isEmpty(),
    check('password','El campo contraseña debe tener minimo 6 caracteres').isLength({min:6}),
    validarCampos
],usuario.crearUsuario)

router.get('/verUsuario',usuario.verUsuarios)

router.post('/login',[
    check('password','El campo contraseña no puede estar vacio').not().isEmpty(),
    check('password','El campo contraseña debe ser alfabético').isAlphanumeric(),
    check('password','El campo contraseña debe tener minimo 6 caracteres').isLength({min:6}),
    check('email','El campo email no puede estar vacio').not().isEmpty(),
    check('email','El campo email debe tener formato email').isEmail(),
    validarCampos
],usuario.loginUsuario)

export default router