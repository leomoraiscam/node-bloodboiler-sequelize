const { ApplicationError, catchAsync } = require('../utils');
const { StatusCodes } = require('http-status-codes');
const { messages } = require('../helpers');

module.exports = catchAsync(async (request, response, next) => {
  const { admin } = request.session;

  if (!admin) {
    throw new ApplicationError(messages.invalidAdmin, StatusCodes.UNAUTHORIZED);
  }

  return next();
});
