import Jwt from "jsonwebtoken";
import Usuario from '../models/usuarios.mjs'

const validarJWT = async ( req, res, next ) => {
    
    const token = req.header('x-token');
    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay JWT'
        });
    }

    try {

        const {uid} = Jwt.verify( token, process.env.SECRET_KEY );
        // leer el usuario que corresponde al uid
        const usuario = await Usuario.findById(uid);

        if ( !usuario ){
            return res.status(401).json( { 
                msg: 'Usuario no existe en DB'
            });
        }
        // Verificar si el uid tiene estado true
        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Token no valido - usuario con estado: false'
            });
        }

        //Añadimos el usuario a la peticion
        req.usuario = usuario
        req.uid = uid;

        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Token no valido'
        });
    }
}


export {validarJWT};