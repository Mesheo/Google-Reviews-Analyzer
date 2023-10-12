const Sequelize = require('sequelize');

module.exports.handler = async (event) => {
	deuBom = '';
	const sequelize = new Sequelize('postgres', 'michel', '4mazz0n!', {
		host: 'business-analyzer.crrkmjqebzph.us-east-1.rds.amazonaws.com',
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

	return {
		statusCode: 200,
		body: JSON.stringify(
			{
				message: `Meu deus esse lambda é meu realreal ${deuBom}`,
				input: event,
			},
			null,
			2
		),
	};
};
