import {response} from 'express';
import Usuario from '../models/usuarios.mjs';
import bcryptjs from 'bcryptjs';
import { generarJWT } from '../helpers/generar-jwt.mjs';
import { googleVerify } from '../helpers/google-verify.mjs';


const login  = async (req, res = response) => {

    const { correo, password } = req.body;
    try {

        // Verificar si el email existe
        const usuario = await Usuario.findOne({correo});
        if ( !usuario ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }
        // Si el usuario esta activo
        if ( !usuario.estado ){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - stado: false'
            });
        }
        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }

        // Generar el JWT
        const token = await generarJWT( usuario.id ); 

        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
        
};


const googleSignIn = async( req, res = response ) => {

    const { id_token } = req.body;

    try {

        const googleUser = await googleVerify(id_token);
        console.log(googleUser)

        res.json({
            msg: 'Todo bien!',
            id_token
        })

    } catch ( error ) {

    }

   
}

export {login, googleSignIn};