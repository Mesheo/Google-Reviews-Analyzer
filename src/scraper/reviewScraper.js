const cheerio = require('cheerio');
const crypto = require('crypto');
const reviewsCreationFunction = require('../../models/reviews');
const Sequelize = require('sequelize');

function createReviewHash(reviewInfo) {
    const reviewData = `${reviewInfo.author}${reviewInfo.stars}${reviewInfo.publishedAt}${reviewInfo.reviewText}${reviewInfo.hasPhoto}`;

    const hash = crypto.createHash('sha256');
    hash.update(reviewData);
    const reviewHash = hash.digest('hex');

    return reviewHash;
}

module.exports = async function reviewScraper(page, sequelize, businessId) {
    let shouldContinue = true;
    const Reviews = reviewsCreationFunction(sequelize, Sequelize)

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
            console.log("\n[WEBSCRAPER ExtractReviewInfo] - Review data fetched susccefully", reviewInfo)
            const reviewHash = createReviewHash(reviewInfo)

            const [review, isCreated] = await Reviews.findOrCreate({
                where: {
                    businessId: reviewInfo.businessId,
                    reviewHash: reviewHash,
                },
                defaults: {
                    ...reviewInfo,
                    reviewHash: reviewHash,
                },
            });

            if (!isCreated) {
                console.log("\n[WEBSCRAPER ExtractReviewInfo] - Review already exist on DB, crawler will stop.");
                shouldContinue = false;
                break;
            }

            console.log("\n[WEBSCRAPER ExtractReviewInfo] - New review added to the database.", review.dataValues)
        }
        await page.waitForTimeout(1000)
    }

}