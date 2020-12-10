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
    id_user: yup
      .number()
      .positive()
      .required(),
    admin: yup
      .number()
      .positive()
      .required(),
  }),
};

module.exports.administrators = {
  list,
  create,
};
