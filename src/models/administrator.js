module.exports = (sequelize, DataTypes) => {
  const Administrator = sequelize.define(
    'Administrators',
    {
      admin: DataTypes.INTEGER,
    },
    {
      tableName: 'administrators',
    },
  );

  return Administrator;
};
