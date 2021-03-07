const router = require('express').Router();
const { castController } = require('../controllers');
const { isAuthorized, validate } = require('../middlewares');
const {
  validationSchemas: { casts },
} = require('../validations');

router.get('/', isAuthorized, validate(casts.list), castController.list);
router.get('/:id', isAuthorized, validate(casts.get), castController.get);
router.post('/', isAuthorized, validate(casts.create), castController.create);

module.exports.casts = router;
