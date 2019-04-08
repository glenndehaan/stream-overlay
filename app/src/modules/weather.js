/**
 * Import vendor modules
 */
const fetch = require('node-fetch');

/**
 * Import own modules
 */
const logger = require('./logger');
const socket = require('./socket');
const config = require('../config');

class weather {
    /**
     * Initial function for updating the weather
     */
    init() {
        if(config.weather.enabled) {
            logger.info(`[WEATHER] Getting weather updates!`);
            this.updateWeather();

            setInterval(() => this.updateWeather(), 120000);
        } else {
            socket.informAllSockets("weather", {
                weather: {}
            });
            config.weather.details = {};

            logger.warn(`[WEATHER] Is disabled!`);
        }
    }

    /**
     * Get the latest weather from our provider
     */
    updateWeather() {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${config.weather.location}&units=metric&lang=nl&APPID=${config.weather.key}`)
            .then(res => res.json())
            .then(body => {
                config.weather.details = body;
                logger.info(`[WEATHER] Updated!`);
                socket.informAllSockets("weather", {
                    weather: body
                });
            });
    }
}

module.exports = new weather();
