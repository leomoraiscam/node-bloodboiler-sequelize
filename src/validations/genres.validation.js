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

const get = {
  params: yup.object().shape({
    id: yup.number().integer(),
  }),
};

const create = {
  body: yup.object().shape({
    name: yup.string().required(),
  }),
};

module.exports.genres = {
  create,
  list,
  get,
};
