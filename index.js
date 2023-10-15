require('dotenv').config({ path: 'config/.env' });
const crawl = require('./src/functions/crawl');
const URL = "https://www.google.com.br/maps/place/Nema+Padaria+-+Niter%C3%B3i/@-22.9039012,-43.113625,17z/data=!3m1!4b1!4m6!3m5!1s0x998373996a193f:0xb7ce627a8de35c77!8m2!3d-22.9039012!4d-43.113625!16s%2Fg%2F11k3fns4xy?entry=ttu";

module.exports.handler = async (event) => {
	await crawler(URL);
	return {
		statusCode: 200,
		body: JSON.stringify(
			{
				status: 'pending',
				message: `URL received. Scrapper has successfully collected the data and saved on database`,
				input: event,
			},
		),
	};
};
