'use strict'

import _ from 'lodash'
import {Movie} from './neo4j/movie.mjs'
import {Person} from './neo4j/person.mjs'

const _singleMovieWithDetails = function (record) {
    if (record.length) {
      const result = {};
      _.extend(result, new Movie(record.get('movie')));
  
      result.directors = _.map(record.get('directors'), record => {
        return new Person(record);
      });
    //   result.genres = _.map(record.get('genres'), record => {
    //     return new Genre(record);
    //   });
    //   result.producers = _.map(record.get('producers'), record => {
    //     return new Person(record);
    //   });
    //   result.writers = _.map(record.get('writers'), record => {
    //     return new Person(record);
    //   });
    //   result.actors = _.map(record.get('actors'), record => {
    //     return record;
    //   });
    //   result.related = _.map(record.get('related'), record => {
    //     return new Movie(record);
    //   });
      return result;
    } else {
      return null;
    }
  };
  

function manyMovies(neo4jResult) {
    return neo4jResult.records.map(r => new Movie(r.get('movie')))
}

// get all movies
export const getAll = (session) => {
    return session.readTransaction(txc => (
        txc.run('MATCH (movie:Movie) RETURN movie')
      ))
      .then(r => manyMovies(r));
  };

export const getById = (session, movieId) => {
    const query = [
        'MATCH (movie:Movie {tmdbId: $movieId})',
        'OPTIONAL MATCH (movie)<-[:DIRECTED]-(d:Person)',
        'WITH DISTINCT movie, d',
        'RETURN DISTINCT movie,',
        'collect(DISTINCT d) AS directors',
      ].join('\n');

      return session.readTransaction(txc =>
        txc.run(query, {
          movieId: movieId
        })
      )
      .then(result => {
        if (!_.isEmpty(result.records)) {
          return _singleMovieWithDetails(result.records[0]);
        }
        else {
          throw {message: 'movie not found', status: 404}
        }
      });
    
}