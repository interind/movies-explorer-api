const router = require('express').Router();
const createError = require('http-errors');

router.all('*', (req, res, next) => next(createError.NotFound('Запрашиваемый ресурс не найден')));

module.exports = router;
