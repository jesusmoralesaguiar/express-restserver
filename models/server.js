import express from 'express';
import cors from 'cors';
import auth_api from '../routes/auth.js';
import categorias from '../routes/categorias.js'
import usuarios_api from '../routes/usuarios.js';
import productos from '../routes/productos.js';
import buscar from '../routes/buscar.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import nconf from '../config.js';
import {dbConnection} from '../database/config.js';

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

class Server {

    constructor() {
        this.app = express();
        this.port = nconf.get("PORT");
        this.paths = {
            auth: '/api/auth',
            usuarios: '/api/usuarios',
            categorias: '/api/categorias',
            productos: '/api/productos',
            buscar: '/api/buscar'
        }

        // Conectar a base de datos
        this.conectarDB();
        //Middlewares
        this.middlewares();
        //Rutas de mi aplicacion
        this.routes();
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
        this.app.use(express.static('public'));

    }

    routes() {
        this.app.use(this.paths.auth, auth_api);
        this.app.use(this.paths.usuarios, usuarios_api);
        this.app.use(this.paths.categorias, categorias);
        this.app.use(this.paths.productos, productos)
        this.app.use(this.paths.buscar, buscar)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`)
        });
    }
}

export default Server;