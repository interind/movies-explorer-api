const router = require('express').Router();
const routerAuth = require('./auth');
const routerUsers = require('./users');
const routerMovies = require('./movies');
const routerError = require('./error');
const auth = require('../middlewares/auth');

router.use(routerAuth);
router.use(auth, routerUsers);
router.use(auth, routerMovies);
router.use(routerError);

module.exports = router;
