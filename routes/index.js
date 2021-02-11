const router = require('express').Router();
const routerAuth = require('./auth.js');
const routerUsers = require('./users.js');
const routerMovies = require('./movies.js');
const routerError = require('./error.js');
const auth = require('../middlewares/auth.js');

router.use('/api', routerAuth);
router.use('/api', auth, routerUsers);
router.use('/api', auth, routerMovies);
router.use(routerError);

module.exports = router;
