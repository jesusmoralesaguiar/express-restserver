import express from 'express';
import cors from 'cors';
import api from '../routes/usuarios.mjs'

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios';

        //Middlewares
        this.middlewares();
        //Rutas de mi aplicacion
        this.routes();
    }

    middlewares() {
        // CORS
        this.app.use( cors() );
        // Lectura y parse del body
        this.app.use(express.json());
        //Directorio Publico
        this.app.use(express.static('public'));

    }

    routes() {
       this.app.use(this.usuariosPath, api)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`)
        });
    }
}

export default Server;