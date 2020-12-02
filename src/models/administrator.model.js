module.exports = (sequelize, DataTypes) => {
  const Administrator = sequelize.define(
    'Administrators',
    {
      admin: DataTypes.INTEGER,
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
      },
    },
    {
      tableName: 'administrators',
    },
  );

  return Administrator;
};
