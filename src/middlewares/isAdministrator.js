const { StatusCodes } = require('http-status-codes');
const { ApplicationError, catchAsync } = require('../utils');
const { messages } = require('../helpers');

module.exports = catchAsync(async (request, response, next) => {
  const { admin } = request.session;

  if (!admin || admin.admin === false) {
    throw new ApplicationError(messages.invalidAdmin, StatusCodes.UNAUTHORIZED);
  }

  return next();
});
