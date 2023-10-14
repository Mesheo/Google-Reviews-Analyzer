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

async function connect(){
    console.log("!!vou conectar no banco")
    try{
        await sequelize.authenticate();
		console.log('Connection has been established successfully.');
	
		await sequelize.sync();
		console.log('Modelo sincronizado com o banco de dados.');
    } catch (error) {
		console.error('Unable to connect to the database:', error);
	}
}


module.exports = { sequelize, connect }
