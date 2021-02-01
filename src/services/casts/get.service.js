const { StatusCodes } = require('http-status-codes');
const { castsRepository } = require('../../repositories');
const { ApplicationError } = require('../../utils');
const { messages } = require('../../helpers');

module.exports = {
  get: async (id) => {
    const castExists = await castsRepository.getById(id);

    if (!castExists) {
      throw new ApplicationError(messages.notFound('cast'), StatusCodes.NOT_FOUND);
    }

    return castExists;
  },
};
