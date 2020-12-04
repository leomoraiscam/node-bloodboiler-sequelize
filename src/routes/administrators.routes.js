const router = require('express').Router();
const { administratorsController } = require('../controllers');
const { isAuthorized } = require('../middlewares');

router.get('/', isAuthorized, administratorsController.index);
router.post('/', administratorsController.create);

module.exports.administrators = router;
