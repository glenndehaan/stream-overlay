/**
 * Import vendor modules
 */
const convert = require('xml-js');
const fetch = require('node-fetch');

/**
 * Import own modules
 */
const logger = require('./logger');
const socket = require('./socket');
const config = require('../config');

class news {
    /**
     * Initial function for updating the news
     */
    init() {
        logger.info(`[NEWS] Indexing news!`);
        this.updateNews();

        setInterval(() => this.updateNews(), 60000);
    }

    /**
     * Get the latest news from our provider
     */
    updateNews() {
        fetch(config.news.url)
            .then(res => res.text())
            .then(body => {
                const parsedBody = convert.xml2json(body);
                this.parseNews(JSON.parse(parsedBody).elements[0].elements[0].elements);
            });
    }

    /**
     * Parse the news data and send it to our clients
     *
     * @param data
     */
    parseNews(data) {
        const newsTitles = [];

        for(let item = 0; item < data.length; item++) {
            if(data[item].name === 'item') {
                for(let i = 0; i < data[item].elements.length; i++) {
                    if(data[item].elements[i].name === 'title') {
                        newsTitles.push(data[item].elements[i].elements[0].text);
                    }
                }
            }
        }

        config.news.titles = newsTitles;
        logger.info(`[NEWS] Items found: ${newsTitles.length}`);
        socket.informAllSockets("news", {
            news: newsTitles
        })
    }
}

module.exports = new news();
