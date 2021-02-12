const createError = require('http-errors');
const Movie = require('../models/movie');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .populate('owner')
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
    .then((movie) => res.send(movie))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findOne({ movieId: req.params.movieId, owner: req.user._id })
    .then((movie) => {
      if ((!movie)) {
        return Promise.reject(createError.NotFound('Такой карточки нет'));
      } if (movie.owner.toString() !== req.user._id) {
        return Promise.reject(createError.Forbidden('Ошибка прав доступа'));
      }
      movie.remove();
      return res.send({ message: 'карточка удалена' });
    })
    .catch(next);
};
