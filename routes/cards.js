const router = require('express').Router();
const validator = require('validator');
const config = require('config');
const { celebrate, Joi } = require('celebrate');
const { regProfile } = require('../utils/reg.ext');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards.js');

router.get('/cards', getCards);
router.post('/cards',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).regex(regProfile)
        .required(),
      link: Joi.string().required().custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message(config.get('messageErrorUrl'));
      }),
    }),
  }), createCard);
router.delete('/cards/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }), deleteCard);
router.put('/cards/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }), likeCard);
router.delete('/cards/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }), dislikeCard);

module.exports = router;
