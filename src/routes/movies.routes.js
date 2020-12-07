const router = require('express').Router();
const { moviesController } = require('../controllers');
const { isAuthorized } = require('../middlewares');

router.get('/', isAuthorized, moviesController.index);
router.post('/', moviesController.create);

module.exports.movies = router;
