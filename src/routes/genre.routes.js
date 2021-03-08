const router = require('express').Router();
const { genreController } = require('../controllers');
const { isAuthorized, isAdministrators, validate } = require('../middlewares');
const {
  validationSchemas: { genres },
} = require('../validations');

router.get('/', isAuthorized, validate(genres.list), genreController.list);
router.get('/:id', isAuthorized, validate(genres.get), genreController.get);
router.post('/', isAuthorized, isAdministrators, validate(genres.create), genreController.create);

module.exports.genres = router;
