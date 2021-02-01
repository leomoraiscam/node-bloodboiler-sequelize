const yup = require('yup');

const create = {
  body: yup.object().shape({
    name: yup.string().required(),
    caracter: yup.string().required(),
  }),
};

module.exports.casts = {
  create,
};
