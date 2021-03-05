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
    id,
    trailerLink,
    image,
    thumbnail,
  } = req.body;
  Movie.findMovieById(id, owner, next)
    .then((resolve) => {
      if (resolve) {
        Movie.create({
          nameEN,
          nameRU,
          country,
          director,
          duration,
          year,
          description,
          id,
          trailerLink,
          image,
          thumbnail,
          owner,
        })
          .then((data) => Movie.findById(data._id).select('-owner'))
          .then((movie) => res.status(config.get('create')).send(movie))
          .catch(next);
      }
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId).select('+owner')
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
