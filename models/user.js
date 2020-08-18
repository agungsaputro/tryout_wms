'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.product, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  };
  user.init({
    full_name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    salt: DataTypes.STRING,
    password: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM('admin','suplier'),
      defaultValue:('suplier')
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};