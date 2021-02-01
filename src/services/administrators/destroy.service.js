const { StatusCodes } = require('http-status-codes');
const { adminstratorsRepository } = require('../../repositories');
const { ApplicationError } = require('../../utils');
const { messages } = require('../../helpers');

module.exports = {
  destroy: async (id) => {
    const administrator = await adminstratorsRepository.getById(id);

    if (!administrator) {
      throw new ApplicationError(messages.notFound('users'), StatusCodes.NOT_FOUND);
    }

    return adminstratorsRepository.destroy(id);
  },
};
