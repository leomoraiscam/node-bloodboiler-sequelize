module.exports = (sequelize, DataTypes) => {
  const Addresses = sequelize.define(
    'Addresses',
    {
      street: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      neighborhood: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      complement: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      uf: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      zipCode: {
        type: DataTypes.STRING,
        field: 'zip_code',
        allowNull: false,
      },
      number: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
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
