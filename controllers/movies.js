const createError = require('http-errors');
const config = require('config');
const Movie = require('../models/movie');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies.reverse()))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    nameEN,
    nameRU,
    country,
    director,
    duration,
    year,
    description,
    movieId,
    trailer,
    image,
    thumbnail,
  } = req.body;
  return Movie.findMovieById(movieId, owner, next)
    .then(() => {
      Movie.create({
        nameEN,
        nameRU,
        country,
        director,
        duration,
        year,
        description,
        movieId,
        trailer,
        image,
        thumbnail,
        owner,
      })
        .then((movie) => res.status(config.get('create')).send(movie))
        .catch((err) => {
          if (err.code === config.get('conflictCode')) {
            return next(createError.Conflict(config.get('messageConflictMovie')));
          }
          return next(err);
        });
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findOne({ movieId: req.params.movieId })
    .then((movie) => {
      if ((!movie)) {
        return Promise.reject(createError.NotFound(config.get('messageNotFound')));
      } if (movie.owner.toString() !== req.user._id) {
        return Promise.reject(createError.Forbidden(config.get('messageForbidden')));
      }
      return movie.remove();
    })
    .then(() => res.send({ message: config.get('messageDeleteMovie') }))
    .catch(next);
};
