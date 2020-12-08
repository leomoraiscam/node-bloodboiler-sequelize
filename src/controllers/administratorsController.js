const { StatusCodes } = require('http-status-codes');
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

  create: async (req, res) => {
    const { body } = req;
    const response = await administratorsService.create(body);

    return res.status(StatusCodes.CREATED).json(response);
  },
};
