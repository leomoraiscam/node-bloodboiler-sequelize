const { getInfoByCep } = require('../api/viacep');
const { addressesRepository, usersRepository } = require('../../repositories');
const { ApplicationError } = require('../../utils');
const { StatusCodes } = require('http-status-codes');
const { messages } = require('../../helpers');

module.exports = {
  create: async (params) => {
    const address = await getInfoByCep(params.zipCode);

    if (!address) {
      throw new ApplicationError(messages.notFound('address'), StatusCodes.NOT_FOUND);
    }

    const user = await usersRepository.getById(params.idUser);

    if (!user) {
      throw new ApplicationError(messages.notFound('users'), StatusCodes.NOT_FOUND);
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
