const { addressesRepository, usersRepository } = require('../../repositories');
const { ApplicationError } = require('../../utils');
const { StatusCodes } = require('http-status-codes');
const { messages } = require('../../helpers');

module.exports = {
  create: async (params) => {
    const user = await usersRepository.getById(params.idUser);

    if (!user) {
      throw new ApplicationError(messages.notFound('users'), StatusCodes.NOT_FOUND);
    }

    const existAddress = await addressesRepository.get({
      zip_code: String(params.zipCode),
      idUser: user.id,
    });

    if (existAddress) {
      throw new ApplicationError(messages.alreadyExists('address'), StatusCodes.CONFLICT);
    }

    const createAddress = await addressesRepository.create({
      zipCode: params.zipCode,
      street: params.street,
      complement: params.complement,
      neighborhood: params.neighborhood,
      city: params.city,
      uf: params.uf,
      idUser: user.id,
      number: params.number,
    });

    return createAddress;
  },
};
