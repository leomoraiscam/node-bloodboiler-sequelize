const faker = require('faker');
const request = require('supertest');
const { StatusCodes } = require('http-status-codes');
const app = require('../../config/express');
const { version } = require('../../config/env');
const { messages } = require('../../helpers');

const { createSampleUsers, createSampleUser } = require('../fixtures/users.fixtures');
const { generateSampleToken, generateSampleInvalidToken } = require('../fixtures/auth.fixtures');

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
    test('Should create an addres for user existent', async () => {
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

    test('Should return 409 - Conflict', async () => {
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

    test('Should return 400 - Not Found', async () => {
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
  test('Should return 200 - Sucess', async () => {
    const zipcode = '36083571';

    const response = await request(app)
      .get(`${baseURL}/addresses/${zipcode}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(StatusCodes.OK);
  });
});
