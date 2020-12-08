const { index } = require('./get.services');
const { create } = require('./create.services');
const { list } = require('./list.services');

module.exports = {
  index,
  create,
  list,
};
