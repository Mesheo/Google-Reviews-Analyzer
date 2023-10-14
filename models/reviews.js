'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reviews extends Model {
    static associate(models) {
      Reviews.belongsTo(models.Business, { foreignKey: 'businessId' });

    }
  }
  Reviews.init({
    reviewId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    businessId: DataTypes.INTEGER,
    stars: DataTypes.INTEGER,
    text: DataTypes.STRING,
    author: DataTypes.STRING,
    date: DataTypes.STRING,
    hasPhoto: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Reviews',
  });
  return Reviews;
};