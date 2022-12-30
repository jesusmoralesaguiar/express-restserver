import {response} from 'express';
const {pathname: root} = new URL('../uploads/', import.meta.url)

import fileUpload from 'express-fileupload'

export const cargaArchivo = ( req, res = response) => {

    if (!req.files.archivo || Object.keys(req.files.archivo).length === 0) {
        res.status(400).send('No files were uploaded.');
        return;
    }

    const {archivo} = req.files;
    const nombreCortado = archivo.name.split('.');
    const extension = nombreCortado[nombreCortado.length -1];

    // Validar la extension
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensionesValidas.includes(extension)) {
        return res.status(400).json({
            msg: `La extension ${extension} no es permitida, ${extensionesValidas}`
        })
    }
    res.json({extension})
    
    // const uploadPath = root + archivo.name;

    // archivo.mv(uploadPath, function(err) {
    //     if (err) {
    //     console.log(err);
    //     return res.status(500).send(err);
    //     }

    //     res.json({msg: 'File uploaded to ' + uploadPath});
    // });

}

