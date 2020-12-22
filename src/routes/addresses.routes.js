const router = require('express').Router();
const { addressesController } = require('../controllers');
const { isAuthorized, validate } = require('../middlewares');
const {
  validationSchemas: { addresses },
} = require('../validations');

router.get('/:cep', isAuthorized, addressesController.get);
router.post('/', isAuthorized, validate(addresses.create), addressesController.create);

module.exports.addresses = router;
