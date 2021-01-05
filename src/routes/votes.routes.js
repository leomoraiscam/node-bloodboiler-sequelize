const router = require('express').Router();
const { votesController } = require('../controllers');
const { isAuthorized, validate, isAdministrators } = require('../middlewares');
const {
  validationSchemas: { votes },
} = require('../validations');

router.get('/', isAuthorized, isAdministrators, validate(votes.list), votesController.list);
router.post('/', isAuthorized, validate(votes.create), votesController.create);

module.exports.votes = router;
