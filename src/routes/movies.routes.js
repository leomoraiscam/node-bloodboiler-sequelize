const router = require('express').Router();
const { moviesController } = require('../controllers');
const { isAuthorized, validate } = require('../middlewares');
const {
  validationSchemas: { movies },
} = require('../validations');

router.get('/', isAuthorized, validate(movies.list), moviesController.index);
router.post('/', isAuthorized, validate(movies.create), moviesController.create);

module.exports.movies = router;
