import { Router } from "express";

import {usuariosGet, usuariosPost, usuariosPut, usuariosDelete} from '../controllers/usuarios.mjs'

const usuarios_router = Router();

usuarios_router.get("/", usuariosGet);

usuarios_router.post("/", usuariosPost)

usuarios_router.put("/:id", usuariosPut)

usuarios_router.delete("/", usuariosDelete)

export default usuarios_router;