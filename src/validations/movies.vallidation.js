const yup = require('yup');

const create = {
  body: yup.object().shape({
    name: yup.string().required(),
    director: yup.string().required(),
    createdBy: yup
      .number()
      .positive()
      .required(),
    author: yup.string().required(),
    updatedBy: yup
      .number()
      .positive()
      .required(),
    author: yup.string().required(),
    genre: yup.string().required(),
  }),
};

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

module.exports.movies = {
  create,
  list,
};
