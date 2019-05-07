/**
 * Check if we are using the dev version
 */
const dev = process.env.NODE_ENV !== 'production';

/**
 * Exports the base config
 */
module.exports = {
    application: {
        name: "Stream Overlay",
        env: dev ? " (local)" : "",
        basePath: "/",
        host: "0.0.0.0",
        port: 3543
    },
    logger: {
        location: "./log",
        level: "info"
    },
    news: {
        enabled: true,
        url: "http://www.nu.nl/rss/Algemeen"
    },
    weather: {
        enabled: true,
        location: "Rotterdam,nl",
        key: ""
    },
    discogs: {
        url: "https://api.discogs.com/database/search",
        key: "",
        secret: ""
    },
    scanner: {
        enabled: true,
        vendorId: 2056,
        productId: 1542
    },
    albums: []
};
