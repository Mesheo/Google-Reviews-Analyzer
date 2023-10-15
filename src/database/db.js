const Sequelize = require('sequelize')
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD, {
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

async function connect() {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Connection with DB has been established successfully!');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
module.exports = { sequelize, connect }
