const router = require('express').Router();
const validator = require('validator');
const config = require('config');
const { celebrate, Joi } = require('celebrate');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies.js');
const {
  regProfile,
  regEn,
  regRu,
} = require('../utils/reg.ext');

router.get('/movies', getMovies);
router.post('/movies',
  celebrate({
    body: Joi.object().keys({
      nameRU: Joi.string().min(2).regex(regRu)
        .required(),
      nameEN: Joi.string().min(2).regex(regEn)
        .required(),
      country: Joi.string().min(2).regex(regProfile)
        .required(),
      director: Joi.string().min(2).regex(regProfile)
        .required(),
      duration: Joi.number().integer().min(1).required(),
      year: Joi.string().length(4).custom((value, helpers) => {
        if (+value >= 1900 && +value <= 2021) {
          return value;
        }
        return helpers.message(config.get('messageNotValidNumber'));
      }).required(),
      description: Joi.string().min(2).regex(regProfile)
        .required(),
      movieId: Joi.number().integer().min(1).required(),
      image: Joi.string().required().custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message(config.get('messageErrorUrl'));
      }),
      trailer: Joi.string().required().custom((value, helpers) => {
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
      movieId: Joi.number().integer().min(1).required(),
    }),
  }), deleteMovie);

module.exports = router;
