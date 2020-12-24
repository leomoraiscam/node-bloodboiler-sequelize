const { StatusCodes } = require('http-status-codes');
const { usersRepository, adminstratorsRepository } = require('../../repositories');
const { ApplicationError } = require('../../utils');
const { encryptor, messages } = require('../../helpers');
const accessTokenService = require('../accessToken');

module.exports.signin = async (email, password) => {
  const user = await usersRepository.get({ email });

  if (!user) {
    throw new ApplicationError(messages.notFound('user'), StatusCodes.NOT_FOUND);
  }

  const isPasswordValid = await encryptor.comparePassword(password, user.password);

  if (!isPasswordValid) {
    throw new ApplicationError(messages.invalidPassword, StatusCodes.UNAUTHORIZED);
  }

  const admin = await adminstratorsRepository.get({
    idUser: user.id,
  });

  const payload = {
    sub: {
      id: user.id,
      name: user.name,
      email: user.email,
      admin,
    },
  };

  return accessTokenService.create(payload);
};
