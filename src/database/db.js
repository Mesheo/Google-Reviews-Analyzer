const Sequelize = require('sequelize')
const dotenv = require("dotenv");
dotenv.config();


const options = {
    host: process.env.HOST,
    dialect: 'postgres',
    pool: {
        max: 10,
        min: 0,
    },
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
}

const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.USERNAME,
    process.env.PASSWORD,
    options
);

async function connect() {
    const a = process.env.DATABASE
    const b = process.env.USERNAME 
    console.log("[DATABASE] - Env Variables: ",{ a, b})
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Connection with DB has been established successfully!');
    } catch (error) {
        console.error('[Database] - Unable to connect to the database:', error);
    }
}
module.exports = { sequelize, connect }
