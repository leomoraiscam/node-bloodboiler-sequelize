const router = require('express').Router();
const multer = require('multer');
const { castController } = require('../controllers');
const { isAuthorized, isAdministrators, validate } = require('../middlewares');
const {
  validationSchemas: { casts },
} = require('../validations');
const uploadConfig = require('../config/multer');

const upload = multer(uploadConfig);

router.get('/', isAuthorized, validate(casts.list), castController.list);
router.get('/:id', isAuthorized, validate(casts.get), castController.get);
router.post(
  '/',
  isAuthorized,
  isAdministrators,
  upload.single('file'),
  validate(casts.create),
  castController.create,
);

module.exports.casts = router;
