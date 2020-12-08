const faker = require('faker');
const request = require('supertest');
const { StatusCodes } = require('http-status-codes');
const app = require('../../config/express');
const { messages } = require('../../helpers');
const { version } = require('../../config/env');
const { createSampleUsers, createSampleUser } = require('../fixtures/users.fixtures');
const { generateSampleToken, generateSampleInvalidToken } = require('../fixtures/auth.fixtures');

const baseURL = `/api/${version}`;

let sampleUser;
let authToken;

beforeAll(async () => {
  await createSampleUsers();
  const auth = await createSampleUser();
  const { token } = await generateSampleToken(auth.id);
  authToken = token;
});

describe('Administrators users Endpoints', () => {
  describe('POST /administrators', () => {
    test('Should create an user administrator', async () => {
      sampleUser = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: 'P@ssw0rd',
      };

      const user = await request(app)
        .post(`${baseURL}/users`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(sampleUser);

      const sampleUserAdmin = {
        id_user: user.body.id,
        admin: 1,
      };

      const response = await request(app)
        .post(`${baseURL}/administrators`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(sampleUserAdmin);

      expect(response.status).toBe(StatusCodes.CREATED);
    });
  });
});
