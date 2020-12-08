const { StatusCodes } = require('http-status-codes');
const { adminstratorsRepository } = require('../repositories');
const { administratorsService } = require('../services');

module.exports = {
  index: async (request, response) => {
    const administrators = await administratorsService.index();

    if (administrators.length === 0) {
      return response
        .status(StatusCodes.NO_CONTENT)
        .set({ 'Content-Length': '0' })
        .end();
    }

    return response.status(StatusCodes.OK).json(administrators);
  },
  list: async (req, res) => {
    const { page, perPage, sortBy } = req.query;
    const response = await administratorsService.list({ page, perPage, sortBy });

    if (!response || response.data.length === 0) {
      return res.status(StatusCodes.NO_CONTENT).end();
    }

    return res.status(StatusCodes.OK).json(response);
  },
  create: async (req, res) => {
    const { body } = req;
    const response = await administratorsService.create(body);

    return res.status(StatusCodes.CREATED).json(response);
  },
};
