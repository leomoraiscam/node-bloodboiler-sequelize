const { index } = require('./list.services');
const { create } = require('./create.services');
const { get } = require('./get.services');
const { destroy } = require('./destroy.services');

module.exports = {
  index,
  create,
  get,
  destroy,
};
