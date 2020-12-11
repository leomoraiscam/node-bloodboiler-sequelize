const { moviesRepository } = require('../../repositories');
const { ApplicationError } = require('../../utils');
const { StatusCodes } = require('http-status-codes');
const { messages } = require('../../helpers');

module.exports = {
  get: async (id) => {
    const movieExists = await moviesRepository.getById(id);

    if (!movieExists) {
      throw new ApplicationError(messages.notFound('movie'), StatusCodes.NOT_FOUND);
    }

    return movieExists;
  },
};
