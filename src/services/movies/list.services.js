const { StatusCodes } = require('http-status-codes');
const { moviesRepository } = require('../../repositories');
const { ApplicationError } = require('../../utils');
const { messages } = require('../../helpers');

module.exports = {
  index: async () => {
    return await moviesRepository.list();
  },
};
