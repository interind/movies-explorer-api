const mongoose = require('mongoose');
const validator = require('validator');
const { regRu, regEn } = require('../utils/reg.ext.js');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  director: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
    default: 0,
  },
  year: {
    type: Number,
    required: true,
    default: 2021,
  },
  description: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isUrl(v),
      message: 'Ошибка в ссылке',
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isUrl(v),
      message: 'Ошибка в ссылке',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isUrl(v),
      message: 'Ошибка в ссылке',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  nameRU: {
    type: String,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator: (v) => regRu.test(v),
      message: 'Ошибка в название фильма',
    },
    required: true,
  },
  nameEN: {
    type: String,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator: (v) => regEn.test(v),
      message: 'Ошибка в название фильма',
    },
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
