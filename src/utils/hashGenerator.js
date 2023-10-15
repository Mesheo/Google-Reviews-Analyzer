const crypto = require('crypto');

module.exports = function hashGenerator(dataObject) {
    const jsonData = JSON.stringify(dataObject, Object.keys(dataObject).sort());

    const hash = crypto.createHash('sha256');
    hash.update(jsonData);
    const reviewHash = hash.digest('hex');

    return reviewHash;
}