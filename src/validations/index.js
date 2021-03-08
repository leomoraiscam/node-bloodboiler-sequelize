const { users } = require('./users.validation');
const { auth } = require('./auth.validation');
const { movies } = require('./movies.vallidation');
const { administrators } = require('./administrators.vallidation');
const { addresses } = require('./addresses.vallidation');
const { votes } = require('./votes.vallidation');
const { casts } = require('./casts.validation');
const { genres } = require('./genres.validation');

module.exports.validationSchemas = {
  users,
  auth,
  movies,
  administrators,
  addresses,
  votes,
  casts,
  genres,
};
