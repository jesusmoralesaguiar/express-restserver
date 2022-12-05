import Role from "../models/role.mjs" 
import Usuario from "../models/usuarios.mjs"

const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if(!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la BD`)
    }
}

// Verificar que el correo existe
const existeEmail = async(correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya esta registrado`)

    }
}

const existeUsuarioPorId = async(id = '') => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`No existe ID ${id}`)
    }
}

export {esRoleValido, existeEmail, existeUsuarioPorId}