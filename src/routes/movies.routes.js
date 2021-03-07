const router = require('express').Router();
const multer = require('multer');
const { moviesController } = require('../controllers');
const { isAuthorized, validate, isAdministrators } = require('../middlewares');
const {
  validationSchemas: { movies },
} = require('../validations');
const uploadConfig = require('../config/multer');

const upload = multer(uploadConfig);

router.get('/', validate(movies.list), moviesController.list);
router.get('/:id', moviesController.get);
router.post(
  '/',
  isAuthorized,
  isAdministrators,
  upload.single('file'),
  validate(movies.create),
  moviesController.create,
);
router.put('/:id', isAuthorized, isAdministrators, validate(movies.update), moviesController.update);
router.delete('/:id', isAuthorized, isAdministrators, moviesController.destroy);

module.exports.movies = router;
