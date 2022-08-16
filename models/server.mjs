import express from 'express';
import cors from 'cors';
import usuarios_api from '../routes/usuarios.mjs'
import movies_api from '../routes/movies.mjs'
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import nconf from '../config.mjs'
import {dbConnection} from '../database/config.mjs'

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
        this.usuariosPath = '/api/usuarios';

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
        this.app.use(nconf.get("api_path") + '/usuarios', usuarios_api);
        this.app.use(nconf.get("api_path"), movies_api);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`)
        });
    }
}

export default Server;