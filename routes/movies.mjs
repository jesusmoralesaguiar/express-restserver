import { Router } from "express";
import {list, findById} from '../controllers/movies.mjs'


const router = Router();

router.get("/movies", list);
router.get("/movies/:id", findById);


export default router;