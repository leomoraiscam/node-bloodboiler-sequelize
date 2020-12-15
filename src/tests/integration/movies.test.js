const faker = require('faker');
const request = require('supertest');
const { StatusCodes } = require('http-status-codes');
const app = require('../../config/express');
const { messages } = require('../../helpers');
const { version } = require('../../config/env');

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

describe('Movies Endpoints', () => {
  describe('POST /movies', () => {
    test('Should create an movie', async () => {
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

      const response = await request(app)
        .post(`${baseURL}/movies`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(SampleMovie);

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
        name: 'matrix',
        director: faker.name.findName(),
        author: faker.name.findName(),
        genre: 'action',
        createdBy: user.body.id,
        updatedBy: user.body.id,
      };

      await request(app)
        .post(`${baseURL}/movies`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(SampleMovie);

      const response = await request(app)
        .post(`${baseURL}/movies`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(SampleMovie);

      expect(response.status).toBe(StatusCodes.CONFLICT);
    });

    test('Should return 400 - Not Found', async () => {
      const response = await request(app)
        .get(`${baseURL}/movies/1234`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });
  });
});

describe('GET /movies', () => {
  test('Should return a list of movies and metadata', async () => {
    const page = 1;
    const perPage = 3;
    const sortBy = 'createdAt:asc';

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
      name: 'matrix',
      director: faker.name.findName(),
      author: faker.name.findName(),
      genre: 'action',
      createdBy: user.body.id,
      updatedBy: user.body.id,
    };

    await request(app)
      .post(`${baseURL}/movies`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(SampleMovie);

    const response = await request(app)
      .get(
        `
        ${baseURL}/movies?page=${page}&perPage=${perPage}&sortBy=${sortBy}`,
      )
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(StatusCodes.OK);

    const { body } = response;
    expect(body).toMatchObject({
      metadata: expect.any(Object),
      data: expect.any(Array),
    });
  });

  test('Should return a list of movies and metadata (without query params)', async () => {
    const response = await request(app)
      .get(`${baseURL}/movies`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(StatusCodes.OK);

    const { body } = response;
    expect(body).toMatchObject({
      metadata: expect.any(Object),
      data: expect.any(Array),
    });
  });

  test('Should return 200 - Sucess', async () => {
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

    const response = await request(app)
      .get(`${baseURL}/movies/${movie.body.id}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(StatusCodes.OK);
  });

  test('Should return 204 - No Content', async () => {
    const page = 2;
    const perPage = 3;

    const response = await request(app)
      .get(`${baseURL}/movies?page=${page}&perPage=${perPage}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(StatusCodes.NO_CONTENT);
  });

  test('Should return 404 - Not Found', async () => {
    const response = await request(app)
      .get(`${baseURL}/administrators/12354`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(StatusCodes.NOT_FOUND);
  });

  test('Should return 400 - Bad Request if sortBy has invalid input', async () => {
    const page = 1;
    const perPage = 10;
    const sortBy = 'createdAtdesc';

    const response = await request(app)
      .get(`${baseURL}/movies?page=${page}&perPage=${perPage}&sortBy=${sortBy}`)
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

describe('PUT /movies', () => {
  test('Should update an movie', async () => {
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

    const SampleNewMovie = {
      name: faker.name.findName(),
      director: faker.name.findName(),
      author: faker.name.findName(),
      genre: 'action',
      createdBy: user.body.id,
      updatedBy: user.body.id,
    };

    const response = await request(app)
      .put(`${baseURL}/movies/${movie.body.id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(SampleNewMovie);

    expect(response.status).toBe(StatusCodes.OK);
  });

  test('Should return 404 - Not Found', async () => {
    const SampleNewMovie = {
      name: faker.name.findName(),
      director: faker.name.findName(),
      author: faker.name.findName(),
      genre: 'action',
      createdBy: 1,
      updatedBy: 1,
    };

    const response = await request(app)
      .put(`${baseURL}/movies/1234`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(SampleNewMovie);

    expect(response.status).toBe(StatusCodes.NOT_FOUND);
  });
});
