const { StatusCodes } = require('http-status-codes');
const { moviesRepository } = require('../../repositories');
const { ApplicationError } = require('../../utils');
const { messages } = require('../../helpers');

module.exports = {
  update: async (id, body, id_session) => {
    const movie = await moviesRepository.getById(id);

    if (!movie) {
      throw new ApplicationError(messages.notFound('movie'), StatusCodes.NOT_FOUND);
    }

    await moviesRepository.update(finalBody, id);

    return body;
  },
};
