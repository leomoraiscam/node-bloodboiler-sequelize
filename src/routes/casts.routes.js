const router = require('express').Router();
const { castsController } = require('../controllers');
const { isAuthorized, validate } = require('../middlewares');
const {
  validationSchemas: { addresses },
} = require('../validations');

router.get('/:cep', isAuthorized, castsController.get);
router.post('/', isAuthorized, castsController.create);

module.exports.casts = router;
