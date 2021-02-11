const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger.js');
const { errorsResponse } = require('./middlewares/errors.js');
const router = require('./routes/index.js');

const app = express();
app.disable('x-powered-by');
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(router);

app.use(errorLogger); // log ошибок
app.use(errors());

app.use(errorsResponse);

module.exports = app;
