import { Router } from "express";
import { check } from "express-validator";
import { login } from "../controllers/auth.mjs";
import { validarCampos } from "../middlewares/validar-campos.mjs";

const auth_router = Router();

auth_router.post("/login",[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);


export default auth_router;