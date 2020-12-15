const { index } = require('./list.services');
const { create } = require('./create.services');
const { get } = require('./get.services');
const { update } = require('./update.services');

module.exports = {
  index,
  create,
  get,
  update,
};
