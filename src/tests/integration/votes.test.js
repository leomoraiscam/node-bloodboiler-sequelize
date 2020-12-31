const faker = require('faker');
const request = require('supertest');
const { StatusCodes } = require('http-status-codes');
const app = require('../../config/express');
const { version } = require('../../config/env');
const { messages } = require('../../helpers');

const { createSampleUsers, createSampleUser } = require('../fixtures/users.fixtures');
const { generateSampleToken, generateSampleInvalidToken } = require('../fixtures/auth.fixtures');
const { fake } = require('faker');
const votes = require('../../services/votes');

const baseURL = `/api/${version}`;

let sampleUserAdmin;
let authToken;

beforeAll(async () => {
  await createSampleUsers();
  const auth = await createSampleUser();
  const { token } = await generateSampleToken(auth.id);
  authToken = token;
});

describe('Votes Endpoints', () => {
  describe('POST /votes', () => {
    test('Should create an vote with note 4 for movie existent', async () => {
      sampleUser = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: 'P@ssw0rd',
      };

      const user = await request(app)
        .post(`${baseURL}/users`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(sampleUser);

      const SampleMovie = {
        name: faker.name.findName(),
        director: faker.name.findName(),
        author: faker.name.findName(),
        genre: 'action',
        createdBy: user.body.id,
        updatedBy: user.body.id,
      };

      const movie = await request(app)
        .post(`${baseURL}/movies`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(SampleMovie);

      const vote = {
        idUser: user.body.id,
        idMovie: movie.body.id,
        note: 4,
      };

      const response = await request(app)
        .post(`${baseURL}/votes`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(vote);

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

      const SampleMovie = {
        name: 'matrix 02',
        director: faker.name.findName(),
        author: faker.name.findName(),
        genre: 'action',
        createdBy: user.body.id,
        updatedBy: user.body.id,
      };

      const movie = await request(app)
        .post(`${baseURL}/movies`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(SampleMovie);

      const vote = {
        idUser: user.body.id,
        idMovie: movie.body.id,
        note: 4,
      };

      await request(app)
        .post(`${baseURL}/votes`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(vote);

      const response = await request(app)
        .post(`${baseURL}/votes`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(vote);

      expect(response.status).toBe(StatusCodes.CONFLICT);
    });

    test('Should return 400 - Not Found', async () => {
      const vote = {
        idUser: 150,
        idMovie: 150,
        note: 4,
      };

      const response = await request(app)
        .post(`${baseURL}/votes`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(vote);

      console.log('test', response.body);
      expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });
  });
});

describe('GET /votes', () => {
  test('Should return a list of users and metadata', async () => {
    const page = 1;
    const perPage = 2;
    const sortBy = 'createdAt:asc';
    const response = await request(app)
      .get(`${baseURL}/votes?page=${page}&perPage=${perPage}&sortBy=${sortBy}`)
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
      .get(`${baseURL}/votes`)
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
    const perPage = 2;
    const sortBy = 'createdAt:asc';
    const response = await request(app)
      .get(`${baseURL}/votes?page=${page}&perPage=${perPage}&sortBy=${sortBy}`)
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
      .get(`${baseURL}/votes?page=${page}&perPage=${perPage}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(StatusCodes.NO_CONTENT);
  });

  test('Should return 400 - Bad Request if sortBy has invalid input', async () => {
    const page = 1;
    const perPage = 10;
    const sortBy = 'createdAtdesc';
    const response = await request(app)
      .get(`${baseURL}/votes?page=${page}&perPage=${perPage}&sortBy=${sortBy}`)
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
