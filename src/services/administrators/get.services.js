const { StatusCodes } = require('http-status-codes');
const { adminstratorsRepository } = require('../../repositories');
const { ApplicationError } = require('../../utils');
const { messages } = require('../../helpers');

module.exports = {
  get: async (params) => {
    const administrators = await adminstratorsRepository.get({ id: params });

    if (!administrators) {
      throw new ApplicationError(messages.notFound('adminstrators'), StatusCodes.NOT_FOUND);
    }

    return administrators;
  },
};
