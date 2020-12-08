const { StatusCodes } = require('http-status-codes');
const { usersRepository, adminstratorsRepository } = require('../../repositories');
const { ApplicationError } = require('../../utils');
const { messages } = require('../../helpers');

module.exports = {
  create: async (params) => {
    const userExists = await usersRepository.getById(params.id_user);

    if (!userExists) {
      throw new ApplicationError(messages.notFound('users'), StatusCodes.NOT_FOUND);
    }

    const createAdministrators = await adminstratorsRepository.create({
      id_user: params.id_user,
      admin: params.admin,
    });

    return createAdministrators;
  },
};
