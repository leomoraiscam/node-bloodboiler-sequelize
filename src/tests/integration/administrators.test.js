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

describe('GET /users', () => {
  test('Should return a list of users administrators and metadata', async () => {
    const page = 1;
    const perPage = 10;
    const sortBy = 'createdAt:asc';
    const response = await request(app)
      .get(`${baseURL}/administrators/list?page=${page}&perPage=${perPage}&sortBy=${sortBy}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(StatusCodes.OK);

    const { body } = response;
    expect(body).toMatchObject({
      metadata: expect.any(Object),
      data: expect.any(Array),
    });
  });

  test('Should return a list of users and metadata (without query params)', async () => {
    const response = await request(app)
      .get(`${baseURL}/administrators/list`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(StatusCodes.OK);

    const { body } = response;
    expect(body).toMatchObject({
      metadata: expect.any(Object),
      data: expect.any(Array),
    });
  });

  test('Should return metadata with nextPage params', async () => {
    const page = 1;
    const perPage = 1;
    const sortBy = 'createdAt:asc';
    const response = await request(app)
      .get(`${baseURL}/administrators/list?page=${page}&perPage=${perPage}&sortBy=${sortBy}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(StatusCodes.OK);

    const { body } = response;
    expect(body).toMatchObject({
      metadata: expect.any(Object),
      data: expect.any(Array),
    });
  });

  test('Should return 204 - No Content', async () => {
    const page = 5;
    const perPage = 10;
    const response = await request(app)
      .get(`${baseURL}/administrators/list?page=${page}&perPage=${perPage}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(StatusCodes.NO_CONTENT);
  });

  test('Should return 400 - Bad Request if sortBy has invalid input', async () => {
    const page = 1;
    const perPage = 10;
    const sortBy = 'createdAtdesc';
    const response = await request(app)
      .get(`${baseURL}/administrators/list?page=${page}&perPage=${perPage}&sortBy=${sortBy}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: messages.invalidFields,
        errors: {
          query: {
            sortBy: "sorting order must be one of the following: 'asc' or 'desc'",
          },
        },
      }),
    );
  });
});
