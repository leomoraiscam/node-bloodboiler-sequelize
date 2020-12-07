const router = require('express').Router();
const { moviesController } = require('../controllers');
//const { isAuthorized } = require('../middlewares');

router.get('/', moviesController.index);
router.post('/', moviesController.create);

module.exports.movies = router;
