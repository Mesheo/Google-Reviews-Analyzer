const Sequelize = require('sequelize');
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

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    deuBom = "CONECTAMOS!!"

    // Sincronize o modelo com o banco de dados
    await sequelize.sync();
    console.log('Modelo sincronizado com o banco de dados.');

} catch (error) {
    console.error('Unable to connect to the database:', error);
} finally {
    // Feche a conexão após a conclusão das operações
    sequelize.close();
}