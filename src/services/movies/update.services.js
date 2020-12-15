const { StatusCodes } = require('http-status-codes');
const { moviesRepository } = require('../../repositories');
const { ApplicationError } = require('../../utils');
const { messages } = require('../../helpers');
const { use } = require('../../utils/nodemailer');

module.exports = {
  update: async (id, body) => {
    const movie = await moviesRepository.getById(id);

    if (!movie) {
      throw new ApplicationError(messages.notFound('movie'), StatusCodes.NOT_FOUND);
    }

    await moviesRepository.update(body, id);

    return body;
  },
};
