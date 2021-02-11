const mongoose = require('mongoose');
const validator = require('validator');
const { regRu, regEn } = require('../utils/reg.ext.js');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    minlength: 2,
    required: true,
  },
  director: {
    type: String,
    minlength: 2,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    minlength: 2,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Ошибка в ссылке',
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Ошибка в ссылке',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Ошибка в ссылке',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isHexadecimal(v),
      message: 'ошибка id',
    },
    length: 24,
  },
  nameRU: {
    type: String,
    minlength: 2,
    validate: {
      validator: (v) => regRu.test(v),
      message: 'Ошибка в название фильма',
    },
    required: true,
  },
  nameEN: {
    type: String,
    minlength: 2,
    validate: {
      validator: (v) => regEn.test(v),
      message: 'Ошибка в название фильма',
    },
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
