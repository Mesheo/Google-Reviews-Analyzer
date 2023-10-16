const businessScraper = require('../scrapers/businessScraper')
const reviewScraper = require('../scrapers/reviewScraper')
const closeBroswer = require('../utils/closeBrowser')
const dbClient = require('../database/db');
const Sequelize = require('sequelize');
const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");
const scrapeRequestsCreationFunction = require('../../models/scraperequests');

module.exports.handler = async function runScraper(event) {
	console.log("[RunScraper HANDLER]- Event: ", event)
	const { url, requestId } = JSON.parse(event.Records[0].body)

	await dbClient.connect();
	const ScrapeRequests = scrapeRequestsCreationFunction(dbClient.sequelize, Sequelize)
	const scrapeRequest = await ScrapeRequests.findByPk(requestId);

	try {
		const browser = await puppeteer
			.launch({
				args: chromium.args,
				defaultViewport: chromium.defaultViewport,
				executablePath: await chromium.executablePath(),
				headless: false,
			});
		const page = await browser.newPage();
		await page.goto(url);

		const { businessId } = await businessScraper(page, dbClient.sequelize);
		await reviewScraper(page, dbClient.sequelize, businessId);

		await closeBroswer(browser);
		await scrapeRequest.update({status: "Finished"});
		console.log("[RunScraper HANDLERR] - Scrape successfully finished! Request status updated at database.")

	} catch (e) {
		console.error("Error occurred: ", e);
	}
	return {
		statusCode: 200,
		body: JSON.stringify(
			{
				message: `Scrape executed`,
				input: event,
			},
		),
	};
}