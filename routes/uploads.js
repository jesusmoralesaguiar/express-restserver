import { Router } from "express";
import { check } from "express-validator";
import { login, googleSignIn } from "../controllers/auth.js";
import { cargaArchivo } from "../controllers/uploads.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.post("/",[], cargaArchivo);

export default router;