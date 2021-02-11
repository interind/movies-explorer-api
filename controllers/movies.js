const createError = require('http-errors');
const Movie = require('../models/movie');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies.reverse()))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;

  const {
    name, link,
  } = req.body;

  Movie.create({
    name,
    link,
    owner,
  })
    .then((movie) => res.send(movie))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
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
