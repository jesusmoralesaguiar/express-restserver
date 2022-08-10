"use strict";

// neo4j cypher helper module
import nconf from '../config.mjs'

import neo4j from 'neo4j-driver';

const driver = neo4j.driver(nconf.get('neo4j-local'), neo4j.auth.basic(nconf.get('USERNAME'), nconf.get('PASSWORD')));

export default function getSession (context) {
    if(context.neo4jSession) {
        return context.neo4jSession;
    } else {
        try {
            context.neo4jSession = driver.session();
        } catch (error) {
            console.log(error);
            throw new Error('Error a la hora de iniciar la conexion con la base de datos')
        }
        return context.neo4jSession;
    }
};
