module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Leonardo',
          email: 'email@email.com',
          password: 'P@ssw0rd',
          created_at: new Date(Date.now()),
          updated_at: new Date(Date.now()),
        },
        {
          name: 'Leonardo Morais',
          email: 'email@gmail.com',
          password: 'P@ssw0rd',
          created_at: new Date(Date.now()),
          updated_at: new Date(Date.now()),
        },
      ],
      {},
    );
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
