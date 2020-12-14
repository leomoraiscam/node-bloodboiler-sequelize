const { get } = require('./get.services');
const { create } = require('./create.services');
const { list } = require('./list.services');
const { destroy } = require('./destroy.services');

module.exports = {
  get,
  create,
  list,
  destroy,
};
