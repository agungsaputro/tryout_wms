'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      product.hasMany(models.product_in, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      product.hasMany(models.product_out, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      product.belongsTo(models.user,{ foreignKey: product.id_user })
    }
  };
  product.init({
    name: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    urlImage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};