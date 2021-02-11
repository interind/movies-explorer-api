const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regProfile } = require('../utils/reg.ext');

const {
  login,
  createUser,
} = require('../controllers/users.js');

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).regex(regProfile)
        .required(),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
      userId: Joi.string().length(24).hex().required(),
    }),
  }),
  createUser,
);
router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
    }),
  }),
  login,
);

module.exports = router;
