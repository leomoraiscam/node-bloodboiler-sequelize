const { StatusCodes } = require('http-status-codes');
const { addressesRepository } = require('../../repositories');
const { ApplicationError } = require('../../utils');
const { messages } = require('../../helpers');

module.exports = {
  update: async (id, body) => {
    const address = await addressesRepository.getById(id);

    if (!address) {
      throw new ApplicationError(messages.notFound('address'), StatusCodes.NOT_FOUND);
    }

    return await addressesRepository.update(body, address.id);
  },
};
