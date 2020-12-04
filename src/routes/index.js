const { users } = require('./users.routes');
const { auth } = require('./auth.routes');
const { administrators } = require('./administrators.routes');

module.exports = {
  users,
  auth,
  administrators,
};
