const yup = require('yup');

const create = {
  body: yup.object().shape({
    name: yup.string().required(),
    director: yup.string().required(),
    id_user: yup
      .number()
      .positive()
      .required(),
    author: yup.string().required(),
    genre: yup.string().required(),
  }),
};

module.exports.movies = {
  create,
};
