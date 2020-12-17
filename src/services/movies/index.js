const { list } = require('./list.services');
const { create } = require('./create.services');
const { get } = require('./get.services');
const { update } = require('./update.services');
const { destroy } = require('./destroy.services');

module.exports = {
  list,
  create,
  get,
  update,
  destroy,
};
