const router = require('express').Router();
const { administratorsController } = require('../controllers');
const { isAuthorized, validate } = require('../middlewares');
const {
  validationSchemas: { administrators },
} = require('../validations');

router.get('/', isAuthorized, administratorsController.index);
router.get('/list', isAuthorized, validate(administrators.list), administratorsController.list);
router.post('/', administratorsController.create);

module.exports.administrators = router;
