const URL = "https://www.google.com.br/maps/place/Degustare+salgados/@-22.832952,-43.0364603,17z/data=!4m6!3m5!1s0x999b2728d20a85:0xb548cbd8d3ca434!8m2!3d-22.832952!4d-43.0364603!16s%2Fg%2F11l4mwvbpx?entry=ttu"

const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

async function scraper(url) {
	const avaliacoesSelector = '.RWPxGd button:nth-child(2)'
	const reviewsSelector = '.MyEned .wiI7pd'

	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();

	try {
		await page.goto(url)
		await page.waitForSelector(avaliacoesSelector, { visible: true });
		await page.screenshot({ path: '1.png' })

		const topInfoContentDiv = await page.$eval('.TIHn2', (element) => element.innerHTML);
		const $ = cheerio.load(topInfoContentDiv);
	

		// GETTING TOP BUSINESS INFO
		const businessName = $('h1.DUwDvf').text();
		const ratingsAverage = parseFloat($('div.F7nice span[aria-hidden="true"]').text().replace(',', '.'));
		const numberOfReviews = parseInt($("div.F7nice span[aria-label]").text().replace(/[()]/g, ''), 10);
		const category = $('div.fontBodyMedium button.DkEaL').text();

		// const botInfoContentDiv = await page.$eval('.TIHn2', (element) => element.innerHTML);
		// console.log(botInfoContentDiv)
		// const $$ = cheerio.load(botInfoContentDiv);



		
		console.log("Data obteined!! - ", { businessName, ratingsAverage, numberOfReviews, category})

		// await page.click(avaliacoesSelector);

		// await page.waitForSelector(reviewsSelector, { visible: true });
		// await page.screenshot({ path: '2.png' })
	} catch (e) {
		console.log("Deu merda>: ", e);
	}
}


module.exports.handler = async (event) => {
	const url_test = "https://medium.com/northcoders/make-a-web-scraper-with-aws-lambda-and-the-serverless-framework-807d0f536d5f"
	// const { name, address, telephone, website, category} = await scraper(URL)

	await scraper(URL);
	return {
		statusCode: 200,
		body: JSON.stringify(
			{
				message: `Meu deus esse lambda é meu realreal`,
				input: event,
			},
			null,
			2
		),
	};
};
