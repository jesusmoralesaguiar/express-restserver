import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import auth_api from '../routes/auth.js';
import categorias from '../routes/categorias.js';
import fileUpload from 'express-fileupload';
import usuarios_api from '../routes/usuarios.js';
import productos from '../routes/productos.js';
import buscar from '../routes/buscar.js';
import { Server } from "socket.io";
import uploads from '../routes/uploads.js';
const {pathname: root} = new URL('../', import.meta.url)

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import nconf from '../config.js';
import {dbConnection} from '../database/config.js';
import { socketController } from '../sockets/controller.js';

const swaggerDefinition = {
    info: {
      title: "Neo4j Movie Demo API (Node/Express)",
      version: "1.0.0",
      description: "",
    },
    host: "localhost:3000",
    basePath: "/api/v0",
  };

// options for the swagger docs
const options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ["./routes/*.js"],
  };

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

class ServerApi {

    constructor() {
        this.app = express();
        this.httpServer = createServer(this.app);
        this.io = new Server(this.httpServer);
        this.port = nconf.get("PORT");
        this.paths = {
            auth: '/api/auth',
            usuarios: '/api/usuarios',
            categorias: '/api/categorias',
            productos: '/api/productos',
            buscar: '/api/buscar',
            uploads: '/api/uploads'
        }

        // Conectar a base de datos
        this.conectarDB();
        //Middlewares
        this.middlewares();
        //Rutas de mi aplicacion
        this.routes();
        //Sockets
        this.sockets(); 
    }

    async conectarDB() {
        await dbConnection()
    }

    middlewares() {
        this.app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
        // CORS
        this.app.use( cors() );
        // Lectura y parse del body
        this.app.use(express.json());
        //Directorio Publico
        this.app.use(express.static(root + '/public'));
        // Note that this option available for versions 1.0.0 and newer.
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));

    }

    routes() {
        this.app.use(this.paths.auth, auth_api);
        this.app.use(this.paths.usuarios, usuarios_api);
        this.app.use(this.paths.categorias, categorias);
        this.app.use(this.paths.productos, productos)
        this.app.use(this.paths.buscar, buscar)
        this.app.use(this.paths.uploads, uploads)
    }

    sockets() {
        this.io.on('connection', socketController)
    }

    listen() {
        
        this.httpServer.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`)
        });
    }

}

export default ServerApi;