import _ from 'lodash';

export function Person (_node) {
  _.extend(this, _node.properties);
  this.id = this.tmdbId;
  this.poster_image = this.poster;
};