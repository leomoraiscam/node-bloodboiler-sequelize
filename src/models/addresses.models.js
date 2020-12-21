module.exports = (sequelize, DataTypes) => {
  const Addresses = sequelize.define(
    'Addresses',
    {
      rua: DataTypes.STRING,
      bairro: DataTypes.STRING,
      complemento: DataTypes.STRING,
      cidade: DataTypes.STRING,
      uf: DataTypes.STRING,
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
      tableName: 'addresses',
    },
  );

  Addresses.associate = function associate(models) {
    models.Administrator.belongsTo(models.User, {
      foreignKey: 'idUser',
    });
  };

  return Addresses;
};
