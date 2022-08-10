'use strict'
import {getAll, getById} from '../models/movies.mjs'
import getSession from '../neo4j/dbUtils.mjs';
import {writeResponse} from '../helpers/response.mjs'

export function list (req, res, next) {
  getAll(getSession(req))
    .then(response => writeResponse(res, response))
    .catch(next);
};

export function findById (req, res, next) {
  getById(getSession(req), req.params.id)
    .then(response => writeResponse(res, response))
    .catch(next);
};
