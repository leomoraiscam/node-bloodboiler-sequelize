const yup = require('yup');

const list = {
  query: yup.object().shape({
    page: yup
      .number()
      .integer()
      .default(1),
    perPage: yup
      .number()
      .integer()
      .default(10),
    sortBy: yup
      .string()
      .default('createdAt:desc')
      .matches(/[:](asc|desc)/i, "sorting order must be one of the following: 'asc' or 'desc'"),
  }),
};

const create = {
  body: yup.object().shape({
    idUser: yup
      .number()
      .positive()
      .required(),
    idMovie: yup
      .number()
      .positive()
      .required(),
    note: yup
      .number()
      .positive()
      .required(),
  }),
};

module.exports.votes = {
  list,
  create,
};
