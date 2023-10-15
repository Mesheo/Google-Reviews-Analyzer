const puppeteer = require('puppeteer');
const businessScraper = require('../scrapers/businessScraper')
const reviewScraper = require('../scrapers/reviewScraper')
const dbClient = require('../database/db');

module.exports = async function crawler(url) {
	try {
		dbClient.connect();

		const browser = await puppeteer.launch({ headless: false });
		const page = await browser.newPage();
		await page.goto(url);

		const { businessId } = await businessScraper(page, dbClient.sequelize);
		await reviewScraper(page, dbClient.sequelize, businessId);
	} catch (e) {
		console.error("Error occurred: ", e);
	}
}