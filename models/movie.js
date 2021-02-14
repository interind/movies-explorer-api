const mongoose = require('mongoose');
const validator = require('validator');
const config = require('config');
const createError = require('http-errors');
const { regRu, regEn } = require('../utils/reg.ext.js');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    minlength: 2,
    required: [true, config.get('messageErrorRequired')],
  },
  director: {
    type: String,
    minlength: 2,
    required: [true, config.get('messageErrorRequired')],
  },
  duration: {
    type: Number,
    min: 1,
    required: [true, config.get('messageErrorRequired')],
  },
  year: {
    type: String,
    required: [true, config.get('messageErrorRequired')],
    validate: {
      validator: (v) => {
        if (+v >= 1900 && +v <= 2021) {
          return v;
        } return false;
      },
      message: config.get('messageNotValidNumber'),
    },
  },
  description: {
    type: String,
    minlength: 2,
    required: [true, config.get('messageErrorRequired')],
  },
  image: {
    type: String,
    required: [true, config.get('messageErrorRequired')],
    validate: {
      validator: (v) => validator.isURL(v),
      message: config.get('messageErrorUrl'),
    },
  },
  trailer: {
    type: String,
    required: [true, config.get('messageErrorRequired')],
    validate: {
      validator: (v) => validator.isURL(v),
      message: config.get('messageErrorUrl'),
    },
  },
  thumbnail: {
    type: String,
    required: [true, config.get('messageErrorRequired')],
    validate: {
      validator: (v) => validator.isURL(v),
      message: config.get('messageErrorUrl'),
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, config.get('messageErrorRequired')],
    ref: 'user',
    unique: true,
  },
  movieId: {
    type: Number,
    min: 1,
    required: [true, config.get('messageErrorRequired')],
  },
  nameRU: {
    type: String,
    minlength: 2,
    validate: {
      validator: (v) => regRu.test(v),
      message: config.get('messageRU'),
    },
    required: [true, config.get('messageErrorRequired')],
  },
  nameEN: {
    type: String,
    minlength: 2,
    validate: {
      validator: (v) => regEn.test(v),
      message: config.get('messageEN'),
    },
    required: [true, config.get('messageErrorRequired')],
  },
});

movieSchema.statics.findMovieById = function (id, next) {
  return this.findOne({ movieId: id })
    .then((movie) => {
      if (movie) {
        return Promise.reject(createError.Conflict(config.get('messageConflictMovie')));
      }
      return Promise.resolve();
    })
    .catch(next);
};

module.exports = mongoose.model('movie', movieSchema);
