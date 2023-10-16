'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ScrapeRequests extends Model {
    static associate(models) {
      ScrapeRequests.belongsTo(models.Business, { foreignKey: 'businessId' });
    }
  }
  ScrapeRequests.init({
    requestId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    businessId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    url: DataTypes.STRING(1000),
  }, {
    sequelize,
    modelName: 'ScrapeRequests',
  });
  return ScrapeRequests;
};