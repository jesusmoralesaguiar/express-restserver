import { Router } from "express";
import { check } from "express-validator";
import { login, googleSignIn } from "../controllers/auth.mjs";
import { validarCampos } from "../middlewares/validar-campos.mjs";

const auth_router = Router();

auth_router.post("/login",[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

auth_router.post("/google",[
    check('id_token', 'El id_token es obligatorio').not().isEmpty(),
    validarCampos
], googleSignIn);


export default auth_router;