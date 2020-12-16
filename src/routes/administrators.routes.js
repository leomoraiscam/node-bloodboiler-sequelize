const router = require('express').Router();
const { administratorsController } = require('../controllers');
const { isAuthorized, validate } = require('../middlewares');
const {
  validationSchemas: { administrators },
} = require('../validations');

router.get('/:id', isAuthorized, administratorsController.index);
router.get('/', isAuthorized, validate(administrators.list), administratorsController.list);
router.post('/', isAuthorized, validate(administrators.create), administratorsController.create);
router.put('/', isAuthorized, validate(administrators.update), administratorsController.update);
router.delete('/:id', isAuthorized, administratorsController.destroy);

module.exports.administrators = router;
