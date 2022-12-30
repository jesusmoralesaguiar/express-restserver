import {response} from 'express';
import mongoose from 'mongoose';
import Usuario from '../models/usuarios.js'

const coleccionesPermitidas = [
    'usuarios',
    'categoria',
    'productos',
    'roles'
]

const buscarUsuarios = async( termino = '', res = response ) => {
    
    const esMongoID = mongoose.ObjectId.isvalid( termino );

    if (esMongoID) {
        const usuario = await Usuario.findById(termino);
        res.json(usuario);
    }
}

export const buscar = ( req, res = response ) => {

    const {coleccion, termino} = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }

    switch(key) {
        case 'usuarios':
            buscarUsuarios(termino, res);
            break;
        case 'categoria':

            break;
        case 'productos':

            break;
        default:
            res.status(500).json({
                msg: `Se le olvido hacer esta busqueda`
            })
    }

}