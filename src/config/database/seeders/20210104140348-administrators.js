module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'administrators',
      [
        {
          id_user: 13,
          admin: 1,
          created_at: new Date(Date.now()),
          updated_at: new Date(Date.now()),
        },
        {
          id_user: 14,
          admin: 1,
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
