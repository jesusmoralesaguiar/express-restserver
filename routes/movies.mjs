import { Router } from "express";
import {list, findById} from '../controllers/movies.mjs'


const movie_router = Router();

movie_router.get("/movies", list);
movie_router.get("/movies/:id", findById);


export default movie_router;