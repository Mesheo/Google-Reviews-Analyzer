const cheerio = require('cheerio');
const businessCreationFunction = require('../../models/business');
const hashGenerator = require("../utils/hashGenerator");
const Sequelize = require('sequelize');

module.exports = async function businessScraper(page, sequelize) {
    console.log("\n[BUSINESS SCRAPER] - Starting to collect info from the Business")
    const Business = businessCreationFunction(sequelize, Sequelize);

    const topInfoDiv = await page.$eval('.TIHn2', (element) => element.innerHTML);
    const $ = cheerio.load(topInfoDiv);

    const name = $('h1.DUwDvf').text();
    const ratingsAverage = parseFloat($('div.F7nice span[aria-hidden="true"]').text().replace(',', '.'));
    const numberOfReviews = parseInt($('div.F7nice span[aria-label]').text().replace(/[()]/g, ''), 10);
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
    console.log("\n[WEBSCRAPER Business Scraper] - Business Data Succesfully fetched: ", businessInfo);
    const businessHash = hashGenerator(businessInfo);

    const [business, isCreated] = await Business.findOrCreate({
        where: {
            name: businessInfo.name,
            businessHash: businessHash,
        },
        defaults: {
            ...businessInfo,
            businessHash,
        },
    });

    if(!isCreated) console.log("\n[WEBSCRAPER - Business Scraper] Business already exist on DB!");
    console.log("[WEBSCRAPER - Business Scraper] Data Succesfully saved: ", business.dataValues);

    return business
}