const Sequelize = require('sequelize');
const reviewsCreationFunction = require('../models/reviews');
require('dotenv').config();

const dbClient = new Sequelize(process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    port: 5432,
});

const Review = reviewsCreationFunction(dbClient, Sequelize);

module.exports ={ Review }
