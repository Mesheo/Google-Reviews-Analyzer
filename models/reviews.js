'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reviews extends Model {
    static associate(models) {
      Reviews.belongsTo(models.Business, {
        foreignKeyConstraint: true
        , onDelete: 'cascade'
      });
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
    reviewText: DataTypes.STRING(1000),
    reviewDate: DataTypes.STRING,
    author: DataTypes.STRING,
    hasPhoto: DataTypes.BOOLEAN,
    reviewHash: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Reviews',
  });
  return Reviews;
};