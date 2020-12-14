const { get } = require('./get.services');
const { create } = require('./create.services');
const { list } = require('./list.services');
const { update } = require('./atualiza.services');

module.exports = {
  get,
  create,
  list,
  update,
};
