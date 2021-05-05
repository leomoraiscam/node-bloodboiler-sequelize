const { StatusCodes } = require('http-status-codes');
const { genresRepository } = require('../../repositories');
const { ApplicationError } = require('../../utils');
const { messages } = require('../../helpers');

module.exports = {
  create: async (params) => {
    const existGenre = await genresRepository.get({
      name: params.name,
    });

    if (existGenre) {
      throw new ApplicationError(messages.alreadyExists('genres'), StatusCodes.CONFLICT);
    }

    const createGenre = await genresRepository.create(params);

    return createGenre;
  },
};
