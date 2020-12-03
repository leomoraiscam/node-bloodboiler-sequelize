const { usersRepository, adminstratorsRepository } = require('../../repositories');
const { ApplicationError } = require('../../utils');

module.exports = {
  create: async (params) => {
    const userExists = await usersRepository.getById(params.id_user);

    if (!userExists) {
      throw new ApplicationError('User not found', 400);
    }

    const createAdministrators = await adminstratorsRepository.create({
      id_user: params.id_user,
      admin: params.admin,
    });

    return createAdministrators;
  },
};
