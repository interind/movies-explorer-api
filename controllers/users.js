const { NODE_ENV, JWT_SECRET } = process.env;
const config = require('config');
const bcrypt = require('bcryptjs');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password, next)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : config.get('secretKey'),
        {
          expiresIn: '7d',
        },
      );
      res.send({ token, _id: user._id });
    })
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return Promise.reject(createError.NotFound('Такого пользователя нет!❌'));
      }
      return res.send(user);
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10).then((hash) => User.create({
    name,
    email,
    password: hash,
  }))
    .then(({ _id }) => {
      User.findById(_id)
        .then((user) => {
          if (!user) {
            return next(createError.Unauthorized('Ошибка регистрации!❌'));
          }
          return res.status(config.get('create')).send(user);
        })
        .catch(next);
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => User.findByIdAndUpdate(
    req.user._id, {
      name,
      email,
      password: hash,
    },
  ),
  {
    new: true,
    runValidators: true,
  })
    .then(({ _id }) => {
      User.findById(_id)
        .then((user) => {
          if (!user) {
            return next(createError.Forbidden('Ошибка доступа!❌'));
          }
          return res.status(config.get('create')).send(user);
        })
        .catch(next);
    })
    .catch(next);
};