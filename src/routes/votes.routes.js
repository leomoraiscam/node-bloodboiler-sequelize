const router = require('express').Router();
const { votesController } = require('../controllers');
const { isAuthorized, validate } = require('../middlewares');
const {
  validationSchemas: { votes },
} = require('../validations');

router.get('/', validate(votes.list), votesController.list);
router.post('/', validate(votes.create), votesController.create);

module.exports.votes = router;
