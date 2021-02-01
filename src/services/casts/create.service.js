const { StatusCodes } = require('http-status-codes');
const { castsRepository } = require('../../repositories');
const { ApplicationError } = require('../../utils');
const { messages } = require('../../helpers');

module.exports = {
  create: async (params) => {
    const existCast = await castsRepository.get({
      name: params.name,
      idMovie: params.idMovie,
    });

    if (existCast) {
      throw new ApplicationError(messages.alreadyExists('cast'), StatusCodes.CONFLICT);
    }

    const createMovies = await castsRepository.create(params);

    return createMovies;
  },
};
