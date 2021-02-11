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
} = require('../utils/reg.ext');

router.get('/movies', getMovies);
router.post('/movies',
  celebrate({
    body: Joi.object().keys({
      nameRU: Joi.string().min(2).max(30).regex(regRu)
        .required(),
      nameEN: Joi.string().min(2).max(30).regex(regEn)
        .required(),
      country: Joi.string().min(2).max(30).regex(regProfile)
        .required(),
      director: Joi.string().min(2).max(30).regex(regProfile)
        .required(),
      duration: Joi.number().min(2).max(30).required(),
      year: Joi.string().min(2).max(30).regex(regProfile)
        .required(),
      description: Joi.string().min(2).max(30).regex(regProfile)
        .required(),
      image: Joi.string().regex(regHttp).required(),
      trailer: Joi.string().regex(regHttp).required(),
      thumbnail: Joi.string().regex(regHttp).required(),
    }),
  }), createMovie);
router.delete('/movies/movieId',
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().length(24).hex().required(),
    }),
  }), deleteMovie);

module.exports = router;
