const fetch = require('node-fetch');
const config = require('../config');

/**
 * Get's LP data from Discogs
 *
 * @param catalogNumber
 * @param callback
 */
module.exports = (catalogNumber, callback) => {
    fetch(`${config.discogs.url}?q=${catalogNumber}&key=${config.discogs.key}&secret=${config.discogs.secret}&{?type,title,release_title,artist,genre,year}&per_page=1`)
        .then(res => res.json())
        .then(body => {
            callback({
                title: body.results[0].title,
                artwork: body.results[0].cover_image
            });
        });
};
