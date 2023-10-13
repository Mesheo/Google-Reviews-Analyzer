'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
    hasPicture: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Reviews',
  });
  return Reviews;
};