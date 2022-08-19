import { response } from "express";
import {Jwt} from "jsonwebtoken";

const validarJWT = ( req, res = response, next ) => {
    
    const token = req.header('x-token');

    console.log(token);

    next();
}


export {validarJWT};