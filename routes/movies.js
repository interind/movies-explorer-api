const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies.js');
const {
  regHttp,
  regProfile,
  regEn,
  regRu,
  regNumber,
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
      duration: Joi.number().integer().required(),
      year: Joi.string().length(4).regex(regNumber)
        .required(),
      description: Joi.string().min(2).regex(regProfile)
        .required(),
      movieId: Joi.number().min(1).integer().required(),
      image: Joi.string().regex(regHttp).required(),
      trailer: Joi.string().regex(regHttp).required(),
      thumbnail: Joi.string().regex(regHttp).required(),
    }),
  }), createMovie);
router.delete('/movies/:movieId',
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.number().min(1).integer().required(),
    }),
  }), deleteMovie);

module.exports = router;
