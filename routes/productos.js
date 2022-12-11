import { Router } from "express";
import { check } from "express-validator";
import { login, googleSignIn } from "../controllers/auth.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { actualizarCategoria, crearCategoria, obtenerCategoria, obtenerCategorias } from "../controllers/categorias.js";
import { existeCategoria, existeCategoriaId, existeProductoId } from "../helpers/db-validators.js";
import { actualizarProducto, crearProducto, obtenerProducto, obtenerProductos } from "../controllers/productos.js";

const router = Router();

router.get("/", [],
obtenerProductos
);

//Obtener una categoria por id
router.get("/:id",
 [
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeProductoId),
    validarCampos
 ], 
obtenerProducto);

//Crear categoria - privado - cualquier persona con un token valido
router.post("/", [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearProducto
);

//Actualizar - privado - cualquier con un token valido
router.put("/:id", [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaId),
    validarCampos
], actualizarProducto);

//Borrar una categoria - admin
router.delete("/:id", [], (req, res) => {
    res.json('delete');
});

export default router;