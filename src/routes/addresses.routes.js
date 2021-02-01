const router = require('express').Router();
const { addressesController } = require('../controllers');
const { isAuthorized, validate } = require('../middlewares');
const {
  validationSchemas: { addresses },
} = require('../validations');

router.get('/:cep', isAuthorized, addressesController.get);
router.post('/', isAuthorized, validate(addresses.create), addressesController.create);
router.put('/:id', isAuthorized, addressesController.update);
router.delete('/:id', isAuthorized, addressesController.destroy);

module.exports.addresses = router;
