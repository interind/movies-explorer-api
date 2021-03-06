const router = require('express').Router();
const validator = require('validator');
const config = require('config');
const { celebrate, Joi } = require('celebrate');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies.js');

router.get('/movies', getMovies);
router.post('/movies',
  celebrate({
    body: Joi.object().keys({
      nameRU: Joi.string().min(2).required(),
      nameEN: Joi.string().min(2).required(),
      country: Joi.string().min(2).required(),
      director: Joi.string().min(2).required(),
      duration: Joi.number().integer().min(1).required(),
      year: Joi.string().length(4).custom((value, helpers) => {
        if (+value >= 1900 && +value <= 2021) {
          return value;
        }
        return helpers.message(config.get('messageNotValidNumber'));
      }).required(),
      description: Joi.string().min(2).required(),
      id: Joi.number().integer().min(1).required(),
      image: Joi.string().required().custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message(config.get('messageErrorUrl'));
      }),
      trailerLink: Joi.string().required().custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message(config.get('messageErrorUrl'));
      }),
      thumbnail: Joi.string().required().custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message(config.get('messageErrorUrl'));
      }),
    }),
  }), createMovie);
router.delete('/movies/:movieId',
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().length(24).hex().required(),
    }),
  }), deleteMovie);

module.exports = router;
