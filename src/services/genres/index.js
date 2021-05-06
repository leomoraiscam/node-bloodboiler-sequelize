const { create } = require('./create.service');
const { get } = require('./get.service');
const { list } = require('./list.service');
const { importGenres } = require('./import.service');

module.exports = {
  create,
  get,
  list,
  importGenres,
};
