import { Categoria, Producto } from "../models/index.js";
import Role from "../models/role.js" 
import Usuario from "../models/usuarios.js"

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

/**
 * @param  {} id=''
 * @param  {} =>{constexisteCategoria=awaitCategoria.findOne({id}
 * @param  {} if(existeCategoria
 * @param  {} {thrownewError(`Lacategoria${id}yaexiste`
 */
export const existeCategoria = async(id = '') => {
    const existeCategoria = await Categoria.findOne({id})
    if (existeCategoria) {
        throw new Error(`La categoria ${id} ya existe`)
    }
}
/**
 * @param  {} id=''
 * @param  {} =>{constexisteCategoria=awaitCategoria.findById(id
 * @param  {} ;if(!existeCategoria
 * @param  {} {thrownewError(`Lacategoria${id}noexiste`
 */
export const existeCategoriaId = async(id = '') => {
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`La categoria ${id} no existe`)
    }
}

export const existeProductoId = async(id = '') => {
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw new Error(`El producto ${id} no existe`)
    }
}
/**
 * @param  {} id=''
 * @param  {} =>{constexisteUsuario=awaitUsuario.findById(id
 * @param  {} ;if(!existeUsuario
 * @param  {} {thrownewError(`NoexisteID${id}`
 */
const existeUsuarioPorId = async(id = '') => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`No existe ID ${id}`)
    }
}

export {esRoleValido, existeEmail, existeUsuarioPorId}