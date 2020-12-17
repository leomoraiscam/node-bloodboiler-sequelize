const router = require('express').Router();
const { moviesController } = require('../controllers');
const { isAuthorized, validate } = require('../middlewares');
const {
  validationSchemas: { movies },
} = require('../validations');

router.get('/', isAuthorized, validate(movies.list), moviesController.list);
router.get('/:id', isAuthorized, moviesController.get);
router.post('/', isAuthorized, validate(movies.create), moviesController.create);
router.put('/:id', isAuthorized, validate(movies.update), moviesController.update);
router.delete('/:id', isAuthorized, moviesController.destroy);

module.exports.movies = router;
