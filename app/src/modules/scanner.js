const UsbScanner = require('usb-barcode-scanner').UsbScanner;
const getDevices = require('usb-barcode-scanner').getDevices;
const discogs = require("./discogs");
const socket = require('./socket');
const log = require('./logger');
const config = require('../config');

/**
 * Logs all available devices when scanner is disabled
 */
const logDevices = () => {
    /**
     * Log devices
     */
    log.info(`[SCANNER][DEVICES] ${JSON.stringify(getDevices())}`);
};

/**
 * Starts scanner when enabled
 */
const init = () => {
    /**
     * Log devices
     */
    log.info(`[SCANNER][DEVICES] ${JSON.stringify(getDevices())}`);

    /**
     * Create scanner object
     *
     * @type {UsbScanner}
     */
    let scanner = new UsbScanner({
        vendorId: config.scanner.vendorId,
        productId: config.scanner.productId
    });

    /**
     * Listen for scanner data
     */
    scanner.on('data', (data) => {
        log.info(`[SCANNER][DATA] ${data}`);

        for (let item = 0; item < config.albums.length; item++) {
            const album = config.albums[item];
            const code = config.albums[item].barcode;

            if (code === data) {
                log.info(`[SCANNER][DATA FOUND] ${JSON.stringify(album)}`);

                discogs(album.catalogNumber, (data) => {
                    socket.currentAlbum = data;

                    socket.informAllSockets("updateAlbum", {
                        currentAlbum: data
                    });
                });
            }
        }
    });

    /**
     * Start scanner
     */
    scanner.startScanning();
};

module.exports = {init, logDevices};
