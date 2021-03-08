const { StatusCodes } = require('http-status-codes');
const { genresRepository } = require('../../repositories');
const { ApplicationError } = require('../../utils');
const { messages } = require('../../helpers');

module.exports = {
  get: async (id) => {
    const genreExists = await genresRepository.getById(id);

    if (!genreExists) {
      throw new ApplicationError(messages.notFound('genre'), StatusCodes.NOT_FOUND);
    }

    return genreExists;
  },
};
