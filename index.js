require('dotenv').config({ path: 'config/.env' });
const runScraper = require('./src/functions/runScraper');
const URL = "https://www.google.com.br/maps/place/Nema+Padaria+-+Visconde+de+Piraj%C3%A1/@-22.9841517,-43.2154292,17z/data=!3m2!4b1!5s0x9bd50757e02857:0x35aa6a9b37f5d532!4m6!3m5!1s0x9bd58a0cdc1487:0x4c1eb56d62eb469b!8m2!3d-22.9841517!4d-43.2128543!16s%2Fg%2F11j20tdp78?hl=pt/@-22.8318517,-43.0292044,15z&entry=ttu";

module.exports.handler = async (event) => {
	console.log("[HANDLER] - Event: ", event)
	await runScraper(URL);
	return {
		statusCode: 200,
		body: JSON.stringify(
			{
				status: 'pending',
				message: `URL received. Scrapper has successfully started to run.`,
				input: event,
			},
		),
	};
};
