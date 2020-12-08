const faker = require('faker');

const { adminstratorsRepository } = require('../../repositories');

const password = 'P@ssw0rd';

const sampleUsersArray = [
  {
    name: faker.name.findName(),
    email: faker.internet.email().toLowerCase(),
    password,
  },
  {
    name: faker.name.findName(),
    email: faker.internet.email().toLowerCase(),
    password,
  },
  {
    name: faker.name.findName(),
    email: faker.internet.email().toLowerCase(),
    password,
  },
];

const createSampleUser = async () => {
  const sampleUser = {
    name: faker.name.findName(),
    email: faker.internet.email().toLowerCase(),
    password,
  };

  return adminstratorsRepository.create(sampleUser);
};

const createSampleUsers = async () => {
  const promises = [];
  sampleUsersArray.forEach((user) => {
    promises.push(adminstratorsRepository.create(user));
  });

  await Promise.all(promises);
};

module.exports = {
  sampleUsersArray,
  createSampleUser,
  createSampleUsers,
};
