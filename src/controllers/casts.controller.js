const { StatusCodes } = require('http-status-codes');
const { castsServices } = require('../services');
const { catchAsync } = require('../utils');

module.exports = {
  create: catchAsync(async (request, response) => {
    const { body, file } = request;

    const avatar = file.filename;

    const finalbody = {
      ...body,
      avatar,
    };

    const cast = await castsServices.create(finalbody);

    return response.status(StatusCodes.CREATED).json(cast);
  }),
};
