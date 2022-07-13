import { Router } from "express";

import {usuariosGet, usuariosPost, usuariosPut, usuariosDelete} from '../controllers/usuarios.mjs'

const router = Router();

router.get("/", usuariosGet);

router.post("/", usuariosPost)

router.put("/:id", usuariosPut)

router.delete("/", usuariosDelete)


export default router;