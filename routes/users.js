const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regProfile } = require('../utils/reg.ext');
const {
  getUser,
  getUsers,
  updateUser,
} = require('../controllers/users.js');

router.get('/users', getUsers);
router.get('/users/me', getUser);
router.patch('/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).regex(regProfile)
        .required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    }),
  }), updateUser);

module.exports = router;
