const { StatusCodes } = require('http-status-codes');
const { Op } = require('sequelize');
const { castsRepository } = require('../../repositories');
const { ApplicationError } = require('../../utils');
const { messages } = require('../../helpers');

module.exports = {
  create: async (params) => {
    const existCast = await castsRepository.get({
      [Op.iLike]: {
        actor: params.name,
      },
    });

    if (existCast) {
      throw new ApplicationError(messages.alreadyExists('cast'), StatusCodes.CONFLICT);
    }

    const createMovies = await castsRepository.create(params);

    return createMovies;
  },
};
