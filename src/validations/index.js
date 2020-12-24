const { users } = require('./users.validation');
const { auth } = require('./auth.validation');
const { movies } = require('./movies.vallidation');
const { administrators } = require('./administrators.vallidation');
const { addresses } = require('./addresses.vallidation');
const { votes } = require('./votes.vallidation');

module.exports.validationSchemas = {
  users,
  auth,
  movies,
  administrators,
  addresses,
  votes,
};
