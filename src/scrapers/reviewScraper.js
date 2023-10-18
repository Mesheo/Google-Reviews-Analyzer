const cheerio = require('cheerio');
const hashGenerator = require("../utils/hashGenerator");
const Sequelize = require('sequelize');
const reviewsCreationFunction = require('../../models/reviews');

module.exports = async function reviewScraper(page, dbClient, businessId) {
    console.log("[ReviewScraper] Starting to collect review Info")
    const Reviews = reviewsCreationFunction(dbClient, Sequelize)

    const avaliacoesSelector = '.RWPxGd button:nth-child(2)';
    await page.waitForSelector(avaliacoesSelector, { visible: true });
    await page.click(avaliacoesSelector);
    const reviewsSelector = '.MyEned .wiI7pd'
    await page.waitForSelector(reviewsSelector, { visible: true });

    let shouldContinue = true;

    const reviewSelector = '.jftiEf.fontBodyMedium';
    await page.waitForSelector(reviewSelector);

    while (shouldContinue) {
        const pageContent = await page.content();
        const $ = cheerio.load(pageContent);
        const reviewDivs = $('.jftiEf.fontBodyMedium');

        for (reviewDiv of reviewDivs) {
            reviewDiv = $(reviewDiv);
            const author = reviewDiv.find('div.d4r55').text();
            const stars = reviewDiv.find('span.kvMYJc img').length;
            const reviewDate = reviewDiv.find('span.rsqaWe').text();
            const reviewText = reviewDiv.find('span.wiI7pd').text();
            const hasPhoto = reviewDiv.find('.Tya61d').length > 0;

            const reviewInfo = {
                author,
                stars,
                reviewDate,
                reviewText,
                hasPhoto,
                businessId,
            }
            console.log("\n[REVIEW SCRAPER] - Review Data Succesfully fetched: ", reviewInfo)
            const reviewHash = hashGenerator(reviewInfo)

            const [review, isCreated] = await Reviews.findOrCreate({
                where: {
                    businessId: reviewInfo.businessId,
                    reviewHash: reviewHash,
                },
                defaults: {
                    ...reviewInfo,
                    reviewHash,
                },
            });

            if (!isCreated) {
                console.log("\n[REVIEW SCRAPER] - Review already exist on DB, crawler will stop.");
                shouldContinue = false;
                break;
            }

            console.log("\n[REVIEW SCRAPER] - New review added to the database.", review.dataValues)
        }
    }
}