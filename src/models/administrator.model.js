module.exports = (sequelize, DataTypes) => {
  const Administrator = sequelize.define(
    'Administrator',
    {
      admin: DataTypes.INTEGER,
      idUser: {
        type: DataTypes.INTEGER,
        field: 'id_user',
      },
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

  Administrator.associate = function associate(models) {
    models.Administrator.belongsTo(models.User, {
      foreignKey: 'idUser',
      as: 'user',
    });
  };

  return Administrator;
};
