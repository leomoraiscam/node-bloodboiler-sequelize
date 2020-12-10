const router = require('express').Router();
const { administratorsController } = require('../controllers');
const { isAuthorized, validate } = require('../middlewares');
const {
  validationSchemas: { administrators },
} = require('../validations');

router.get('/show/:id', isAuthorized, administratorsController.index);
router.get('/list', isAuthorized, validate(administrators.list), administratorsController.list);
router.post('/', isAuthorized, validate(administrators.create), administratorsController.create);

module.exports.administrators = router;
