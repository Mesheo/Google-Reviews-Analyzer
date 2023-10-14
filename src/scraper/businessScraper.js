const cheerio = require('cheerio');
const businessCreationFunction = require('../../models/business');
const Sequelize = require('sequelize');

module.exports = async function extractBusinessInfo(page, sequelize) {
    const Business = businessCreationFunction(sequelize, Sequelize);

    const topInfoDiv = await page.$eval('.TIHn2', (element) => element.innerHTML);
    const $ = cheerio.load(topInfoDiv);

    const name = $('h1.DUwDvf').text();
    const ratingsAverage = parseFloat($('div.F7nice span[aria-hidden="true"]').text().replace(',', '.'));
    const numberOfReviews = parseInt($("div.F7nice span[aria-label]").text().replace(/[()]/g, ''), 10);
    const category = $('div.fontBodyMedium button.DkEaL').text();

    const botInfoDiv = await page.$eval(`div[aria-label="Informações de ${name}"]`, (element) => element.innerHTML);
    const $$ = cheerio.load(botInfoDiv);
    const cardsbotInfoDiv = $$('button[aria-label*="Endereço:"], button[aria-label*="Telefone:"], a[aria-label*="Website:"]');

    let address = "";
    let telephone = "";
    let website = "";
    cardsbotInfoDiv.each(function () {
        const label = $(this).attr('aria-label');
        if (label.includes('Endereço:')) {
            address = label.replace('Endereço: ', '');
        } else if (label.includes('Telefone:')) {
            telephone = label.replace('Telefone: ', '');
        } else if (label.includes('Website:')) {
            const href = $(this).attr('href');
            website = href;
        }
    });

    const businessInfo = {
        name,
        address,
        telephone,
        website,
        category,
        ratingsAverage,
        numberOfReviews,
    }
    console.log("[WEBSCRAPER - Business Scraper] Data Succesfully fetched: ", businessInfo);

    const business = await Business.create(businessInfo);
    console.log("[WEBSCRAPER - Business Scraper] Data Succesfully saved: ", business.dataValues);
    return business
}