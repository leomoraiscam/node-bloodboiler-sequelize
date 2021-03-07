module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'administrators',
      [
        {
          id_user: 1,
          admin: true,
          created_at: new Date(Date.now()),
          updated_at: new Date(Date.now()),
        },
        {
          id_user: 2,
          admin: true,
          created_at: new Date(Date.now()),
          updated_at: new Date(Date.now()),
        },
      ],
      {},
    );
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('administrators', null, {});
  },
};
