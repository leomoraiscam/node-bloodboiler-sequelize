const usersRepository = require('./user.repository');
const accessTokenRepository = require('./accessToken.repository');
const adminstratorsRepository = require('./administrators.repository');
const moviesRepository = require('./movies.repository');
const addressesRepository = require('./addresses.repository');
const votesRepository = require('./votes.repository');
const castsRepository = require('./casts.repository');
const genresRepository = require('./genres.repository');

module.exports = {
  usersRepository,
  accessTokenRepository,
  adminstratorsRepository,
  moviesRepository,
  addressesRepository,
  votesRepository,
  castsRepository,
  genresRepository,
};
