import { response } from "express";


const esAdminRole = ( req, res = response, next ) => {

    if ( !req.usuario ) {
        return res.status(500).json({
            msg: 'Se requiere verificar el role sin validar el token primero'
        });
    }

    
    const { rol, nombre } = req.usuario

    if ( rol !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg: `${nombre} no es administrador - no puede hacer eso`
        });
    }
    next();

}

const tieneRole = (...roles) => {
    return (req, res = response, next) => {

        if ( !req.usuario ) {
            return res.status(500).json({
                msg: 'Se requiere verificar el role sin validar el token primero'
            });
        }

        if ( !roles.includes( req.usuario.rol )) {
            return res.status(401).json({
                msg: `El servicio require uno de estos roles ${roles}`
            })
        }

        next()
    }
}


export {esAdminRole, tieneRole}