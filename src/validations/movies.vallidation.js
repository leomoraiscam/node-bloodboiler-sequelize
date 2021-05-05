const yup = require('yup');

const create = {
  body: yup.object().shape({
    name: yup.string().required(),
    director: yup.string().required(),
    author: yup.string().required(),
    lang: yup.string().required(),
    description: yup.string().required(),
    duration: yup.string().required(),
    classification: yup
      .mixed()
      .oneOf(['7+', '13+', '16+', '18+'])
      .required(),
    yearCreation: yup
      .number()
      .integer()
      .required(),
    genresIds: yup.array().of(yup.number()),
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

const update = {
  body: yup.object().shape({
    name: yup.string().required(),
    director: yup.string().required(),
    author: yup.string().required(),
    lang: yup.string().required(),
    description: yup.string().required(),
  }),
};

module.exports.movies = {
  create,
  list,
  update,
};
