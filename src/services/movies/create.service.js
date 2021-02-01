const { StatusCodes } = require('http-status-codes');
const { moviesRepository } = require('../../repositories');
const { ApplicationError } = require('../../utils');
const { messages } = require('../../helpers');

module.exports = {
  create: async (params) => {
    const movieExists = await moviesRepository.get({
      name: params.name,
    });

    if (movieExists) {
      throw new ApplicationError(messages.alreadyExists('movie'), StatusCodes.CONFLICT);
    }

    const createMovies = await moviesRepository.create(params);

    return createMovies;
  },
};
