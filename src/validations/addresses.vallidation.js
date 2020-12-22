const yup = require('yup');

const create = {
  body: yup.object().shape({
    zipCode: yup
      .number()
      .positive()
      .required(),
    street: yup.string().required(),
    complement: yup.string(),
    neighborhood: yup.string().required(),
    city: yup.string().required(),
    uf: yup.string().required(),
    idUser: yup
      .number()
      .positive()
      .required(),
    number: yup
      .number()
      .positive()
      .required(),
  }),
};

module.exports.addresses = {
  create,
};
