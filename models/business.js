'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Business extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Business.init({
    businessId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ratingsAverage: DataTypes.FLOAT,
    numberOfReviews: DataTypes.INTEGER,
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    telephone: DataTypes.STRING,
    website: DataTypes.STRING,
    category: DataTypes.STRING,
    businessHash: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Business',
    tableName: 'Business'
  });
  return Business;
};