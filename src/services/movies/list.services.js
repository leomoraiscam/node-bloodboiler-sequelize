const { StatusCodes } = require('http-status-codes');
const { moviesRepository } = require('../../repositories');
const { ApplicationError } = require('../../utils');
const { messages } = require('../../helpers');

module.exports = {
  index: async () => {
    const movies = await moviesRepository.list();

    if (!movies) {
      throw new ApplicationError(messages.notFound('movies'), StatusCodes.NOT_FOUND);
    }

    return movies;
  },
};
