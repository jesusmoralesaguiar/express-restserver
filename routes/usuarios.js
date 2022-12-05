import { Router } from "express";

import {usuarioGet, usuariosGet, usuariosPost, usuariosPut, usuariosDelete} from '../controllers/usuarios.js'
import { check } from "express-validator";
import { esRoleValido, existeEmail, existeUsuarioPorId } from "../helpers/db-validators.js";

import { validarCampos, validarJWT, esAdminRole, tieneRole} from "../middlewares/index.js";

const usuarios_router = Router();

usuarios_router.get("/", usuariosGet);

usuarios_router.get("/:id",[
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuarioGet)

usuarios_router.post("/", [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser mas de 6 letras').isLength({min: 6}),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(existeEmail),
    // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPost)

usuarios_router.put("/:id",[
    check('id', 'No es un ID valido ').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    
    validarCampos
], usuariosPut)

usuarios_router.delete("/:id",[
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE', 'NOSE_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete)

export default usuarios_router;