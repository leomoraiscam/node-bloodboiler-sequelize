const router = require('express').Router();
const multer = require('multer');
const { genreController } = require('../controllers');
const { isAuthorized, isAdministrators, validate } = require('../middlewares');
const {
  validationSchemas: { genres },
} = require('../validations');
const uploadConfig = require('../config/multer');

const upload = multer(uploadConfig);

router.get('/', isAuthorized, validate(genres.list), genreController.list);
router.get('/:id', isAuthorized, validate(genres.get), genreController.get);
router.post('/', isAuthorized, isAdministrators, validate(genres.create), genreController.create);
router.post('/import', isAuthorized, upload.single('file'), genreController.import);

module.exports.genres = router;
