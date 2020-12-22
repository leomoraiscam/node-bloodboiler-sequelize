const router = require('express').Router();
const { addressesController } = require('../controllers');
const { isAuthorized, validate } = require('../middlewares');

router.get('/:cep', isAuthorized, addressesController.get);
router.post('/', isAuthorized, addressesController.create);

module.exports.addresses = router;
