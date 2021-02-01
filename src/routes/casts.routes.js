const router = require('express').Router();
const multer = require('multer');
const { castsController } = require('../controllers');
const { isAuthorized, validate } = require('../middlewares');
const {
  validationSchemas: { casts },
} = require('../validations');
const uploadConfig = require('../config/multer');

const upload = multer(uploadConfig);

router.post('/', isAuthorized, upload.single('file'), validate(casts.create), castsController.create);

module.exports.casts = router;
