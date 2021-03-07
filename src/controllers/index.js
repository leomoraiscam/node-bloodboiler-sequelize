const usersController = require('./users.controller');
const authController = require('./auth.controller');
const administratorsController = require('./administrators.controller');
const moviesController = require('./movies.controller');
const addressesController = require('./addresses.controller');
const votesController = require('./votes.controller');
const castController = require('./casts.controller');

module.exports = {
  usersController,
  authController,
  administratorsController,
  moviesController,
  addressesController,
  votesController,
  castController,
};
