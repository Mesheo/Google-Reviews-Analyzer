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


		// Encontre a div com a classe "TIHn2" e obtenha seu conteúdo HTML.
		const divContent = await page.$eval('.TIHn2', (element) => element.innerHTML);
		const $ = cheerio.load(divContent);
		// Extrair o nome da loja
		const nomeDaLoja = $('h1.DUwDvf').text();
		console.log('O nome da loja:', nomeDaLoja);

		// Extrair a média das avaliações
		const mediaAvaliacoes = $('div.F7nice span[aria-hidden="true"]').text();
		console.log('Média das avaliações:', mediaAvaliacoes);

		// Extrair a quantidade de avaliações
		const quantidadeAvaliacoes = $('div.F7nice span[aria-label^="2 avaliações"]').text();
		console.log('Quantidade de avaliações:', quantidadeAvaliacoes);

		// Extrair a categoria
		const categoria = $('div.fontBodyMedium button.DkEaL').text();
		console.log('Categoria:', categoria);


		// await page.click(avaliacoesSelector);

		// await page.waitForSelector(reviewsSelector, { visible: true });
		// await page.screenshot({ path: '2.png' })

		const htmlDesejado = $('.lMbq3e');
		console.log("HTML desejado \n", htmlDesejado)
		const $$ = cheerio.load(htmlDesejado);

		// Extraia as informações desejadas
		const nomeNegocio = $$('h1.DUwDvf').text();
		const mediaEstrelas = $$('span[aria-hidden="true"]').text();
		const numAvaliacoes = $$('span[aria-label*="avaliações"]').text().match(/\d+/)[0];
		const categoriaNegocio = $$('button[jsaction="pane.rating.category"]').text();

		console.log('Nome do Negócio:', nomeNegocio);
		console.log('Média de Estrelas:', mediaEstrelas);
		console.log('Número de Avaliações:', numAvaliacoes);
		console.log('Categoria do Negócio:', categoriaNegocio);


		const text = await page.evaluate(() => {
			const spanElement = document.querySelector('.MyEned .wiI7pd'); // Seleciona o span desejado
			return spanElement.textContent; // Obtém o texto do span
		});

		console.log(text); // Exibe o texto no console
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
