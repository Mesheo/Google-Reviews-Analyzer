const businessScraper = require('../scrapers/businessScraper')
const reviewScraper = require('../scrapers/reviewScraper')
const dbClient = require('../database/db');
const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");

module.exports = async function runScraper(url) {
	try {
		dbClient.connect();
		a = await chromium.executablePath();
		console.log("\n[RUNSCRAPER] - chromium.executablePath: ", a)
		const browser = await puppeteer
        .launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath(),
            headless: chromium.headless,
        });
		const page = await browser.newPage();
		await page.goto(url);

		const { businessId } = await businessScraper(page, dbClient.sequelize);
		await reviewScraper(page, dbClient.sequelize, businessId);

		await browser.close();
	} catch (e) {
		console.error("Error occurred: ", e);
	}
}