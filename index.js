require('dotenv').config({ path: 'config/.env' });
const URL = "https://www.google.com.br/maps/place/Nema+Padaria+-+Niter%C3%B3i/@-22.9039012,-43.113625,17z/data=!3m1!4b1!4m6!3m5!1s0x998373996a193f:0xb7ce627a8de35c77!8m2!3d-22.9039012!4d-43.113625!16s%2Fg%2F11k3fns4xy?entry=ttu";
const puppeteer = require('puppeteer');
const dbClient = require('./src/database/db');
const businessScraper = require('./src/scraper/businessScraper')
const reviewScraper = require('./src/scraper/reviewScraper')
const Sequelize = require('sequelize')
dbClient.connect();

async function scraper(url) {
	try {
		const browser = await puppeteer.launch({ headless: false });
		const page = await browser.newPage();
		await page.goto(url);

		const avaliacoesSelector = '.RWPxGd button:nth-child(2)';
		await page.waitForSelector(avaliacoesSelector, { visible: true });
		const { businessId } = await businessScraper(page, dbClient.sequelize);
		
		await page.click(avaliacoesSelector);
		const reviewsSelector = '.MyEned .wiI7pd'
		await page.waitForSelector(reviewsSelector, { visible: true });
		console.log("!!VOU entrar no review scraper")
		await reviewScraper(page, dbClient.sequelize, businessId);
	} catch (e) {
		console.error("Error occurred: ", e);
	}
}

module.exports.handler = async (event) => {
	await scraper(URL);
	return {
		statusCode: 200,
		body: JSON.stringify(
			{
				status: 'pending',
				message: `Send to Metrics Queue, wait for notification`,
				input: event,
			},
			null,
			2
		),
	};
};
