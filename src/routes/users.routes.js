const router = require('express').Router();
const { usersController } = require('../controllers');
const { isAuthorized, validate } = require('../middlewares');
const {
  validationSchemas: { users },
} = require('../validations');

router.get('/', isAuthorized, validate(users.list), usersController.list);
router.get('/:id', isAuthorized, validate(users.get), usersController.get);
router.post('/', isAuthorized, validate(users.create), usersController.create);
router.put('/:id', isAuthorized, validate(users.update), usersController.update);
router.delete('/:id', isAuthorized, validate(users.destroy), usersController.destroy);

module.exports.users = router;
