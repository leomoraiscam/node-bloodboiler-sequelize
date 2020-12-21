const { users } = require('./users.routes');
const { auth } = require('./auth.routes');
const { administrators } = require('./administrators.routes');
const { movies } = require('./movies.routes');
const { addresses } = require('./addresses.routes');

module.exports = {
  users,
  auth,
  administrators,
  movies,
  addresses,
};
