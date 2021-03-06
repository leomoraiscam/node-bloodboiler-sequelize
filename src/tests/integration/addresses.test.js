const faker = require('faker');
const request = require('supertest');
const { StatusCodes } = require('http-status-codes');
const app = require('../../config/express');
const { version } = require('../../config/env');

const { createSampleUsers, createSampleUser } = require('../fixtures/users.fixtures');
const { generateSampleToken } = require('../fixtures/auth.fixtures');

const baseURL = `/api/${version}`;

let sampleUserAdmin;
let authToken;

beforeAll(async () => {
  await createSampleUsers();
  const auth = await createSampleUser();
  const { token } = await generateSampleToken(auth.id);
  authToken = token;
});

describe('Administrators users Endpoints', () => {
  describe('POST /addresses', () => {
    test('Should create an addres for user existent and the return should be sucess', async () => {
      sampleUser = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: 'P@ssw0rd',
      };

      const user = await request(app)
        .post(`${baseURL}/users`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(sampleUser);

      const mainSampleAddress = {
        zipCode: '36083571',
        street: 'Rua Sylvio Ribeiro Aragão',
        complement: 'condominio',
        neighborhood: 'Bairro industrial',
        city: 'Juiz de Fora',
        uf: 'MG',
        idUser: user.body.id,
        number: 200,
      };

      const response = await request(app)
        .post(`${baseURL}/addresses`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(mainSampleAddress);

      expect(response.status).toBe(StatusCodes.CREATED);
    });

    test('Should fail to create a addres existing and the return should conflict', async () => {
      sampleUser = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: 'P@ssw0rd',
      };

      const user = await request(app)
        .post(`${baseURL}/users`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(sampleUser);

      const mainSampleAddress = {
        zipCode: '36083571',
        street: 'Rua Sylvio Ribeiro Aragão',
        complement: 'condominio',
        neighborhood: 'Bairro industrial',
        city: 'Juiz de Fora',
        uf: 'MG',
        idUser: user.body.id,
        number: 200,
      };

      await request(app)
        .post(`${baseURL}/addresses`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(mainSampleAddress);

      const response = await request(app)
        .post(`${baseURL}/addresses`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(mainSampleAddress);

      expect(response.status).toBe(StatusCodes.CONFLICT);
    });

    test('Should fail to create a address for a user doesnt exist and return user not found', async () => {
      const mainSampleAddress = {
        zipCode: '36083571',
        street: 'Rua Sylvio Ribeiro Aragão',
        complement: 'condominio',
        neighborhood: 'Bairro industrial',
        city: 'Juiz de Fora',
        uf: 'MG',
        idUser: 200,
        number: 200,
      };

      const response = await request(app)
        .post(`${baseURL}/addresses`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(mainSampleAddress);

      expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });
  });
});

describe('GET /users', () => {
  test('Should return an address according to the zip code entered and return should be sucess', async () => {
    const zipcode = '36083571';

    const response = await request(app)
      .get(`${baseURL}/addresses/${zipcode}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(StatusCodes.OK);
  });
});

describe('PUT /addresses', () => {
  test('Should update an address of user', async () => {
    sampleUser = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: 'P@ssw0rd',
    };

    const user = await request(app)
      .post(`${baseURL}/users`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(sampleUser);

    const mainSampleAddress = {
      zipCode: '36083571',
      street: 'Rua Sylvio Ribeiro Aragão',
      complement: 'condominio',
      neighborhood: 'Bairro industrial',
      city: 'Juiz de Fora',
      uf: 'MG',
      idUser: user.body.id,
      number: 200,
    };

    const address = await request(app)
      .post(`${baseURL}/addresses`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(mainSampleAddress);

    const updateSampleAddress = {
      zipCode: '36083-571',
      street: 'Rua Sylvio Ribeiro Aragão, Nº 200',
      complement: 'condominio jardim bandeirantes',
      neighborhood: 'Bairro industrial',
      city: 'Juiz de Fora',
      uf: 'MG',
      idUser: user.body.id,
      number: 200,
    };

    const response = await request(app)
      .put(`${baseURL}/addresses/${address.body.id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(updateSampleAddress);

    expect(response.status).toBe(StatusCodes.NO_CONTENT);
  });

  test('Should return 404 - Not Found', async () => {
    sampleUser = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: 'P@ssw0rd',
    };

    const user = await request(app)
      .post(`${baseURL}/users`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(sampleUser);

    const mainSampleAddress = {
      zipCode: '36083571',
      street: 'Rua Sylvio Ribeiro Aragão',
      complement: 'condominio',
      neighborhood: 'Bairro industrial',
      city: 'Juiz de Fora',
      uf: 'MG',
      idUser: user.body.id,
      number: 200,
    };

    const address = await request(app)
      .post(`${baseURL}/addresses`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(mainSampleAddress);

    const updateSampleAddress = {
      zipCode: '36083-571',
      street: 'Rua Sylvio Ribeiro Aragão, Nº 200',
      complement: 'condominio jardim bandeirantes',
      neighborhood: 'Bairro industrial',
      city: 'Juiz de Fora',
      uf: 'MG',
      idUser: user.body.id,
      number: 200,
    };

    const response = await request(app)
      .put(`${baseURL}/addresses/101010 `)
      .set('Authorization', `Bearer ${authToken}`)
      .send(updateSampleAddress);

    expect(response.status).toBe(StatusCodes.NOT_FOUND);
  });
});

describe('DELETE /addresses', () => {
  test('Should delete an address', async () => {
    sampleUser = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: 'P@ssw0rd',
    };

    const user = await request(app)
      .post(`${baseURL}/users`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(sampleUser);

    const mainSampleAddress = {
      zipCode: '36083571',
      street: 'Rua Sylvio Ribeiro Aragão',
      complement: 'condominio',
      neighborhood: 'Bairro industrial',
      city: 'Juiz de Fora',
      uf: 'MG',
      idUser: user.body.id,
      number: 200,
    };

    const address = await request(app)
      .post(`${baseURL}/addresses`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(mainSampleAddress);

    const response = await request(app)
      .delete(`${baseURL}/addresses/${address.body.id}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(StatusCodes.NO_CONTENT);
  });

  test('Should return 404 - Not Found', async () => {
    const response = await request(app)
      .delete(`${baseURL}/addresses/101010`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(StatusCodes.NOT_FOUND);
  });
});
