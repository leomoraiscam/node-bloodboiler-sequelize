const usersService = require('./users');
const authService = require('./auth');
const accessTokenService = require('./accessToken');
const administratorsService = require('./administrators');
const moviesService = require('./movies');
const addressesServives = require('./addresses');
const votesService = require('./votes');
const castsServices = require('./casts');
const genresServices = require('./genres');

module.exports = {
  usersService,
  authService,
  accessTokenService,
  administratorsService,
  moviesService,
  addressesServives,
  votesService,
  castsServices,
  genresServices,
};
