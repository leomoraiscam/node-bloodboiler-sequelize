const { StatusCodes } = require('http-status-codes');
const { adminstratorsRepository } = require('../../repositories');
const { ApplicationError } = require('../../utils');
const { messages } = require('../../helpers');
const { use } = require('../../utils/nodemailer');

module.exports = {
  update: async (id, body) => {
    const user = await adminstratorsRepository.getById(body.id);

    if (!user) {
      throw new ApplicationError(messages.notFound('users'), StatusCodes.NOT_FOUND);
    }

    await adminstratorsRepository.update(body, user.id);

    return body;
  },
};
