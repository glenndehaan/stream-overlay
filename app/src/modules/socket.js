/**
 * Import base packages
 */
const uuidv4 = require('uuid/v4');
const btoa = require('btoa');
const atob = require('atob');
const log = require("./logger");
const config = require("../config");
const discogs = require("./discogs");

class socket {
    /**
     * Constructor
     */
    constructor() {
        this.socket = null;
        this.currentAlbum = {
            title: '',
            artist: '',
            artwork: ''
        };
    }

    /**
     * Init the socket connection
     *
     * @param server
     */
    init(server) {
        this.socket = require('express-ws')(server);

        /**
         * WS main route
         */
        server.ws('/', (ws) => {
            /**
             * Create globals
             */
            ws.id = uuidv4();

            /**
             * Main message bus
             */
            ws.on('message', (data) => {
                const dataString = this.decrypt(data);

                if (typeof dataString.instruction === "undefined" || dataString.instruction === "") {
                    global.log.error(`[SOCKET][${ws.id}] No instruction received from socket`);
                    return;
                }

                if (dataString.instruction === "updateAlbum") {
                    log.info(`[SOCKET][${ws.id}][updateAlbum] RAW Data: ${JSON.stringify(dataString.data)}`);

                    if(dataString.data.album.catalogNumber !== "") {
                        discogs(dataString.data.album.catalogNumber, (data) => {
                            this.currentAlbum = data;

                            this.informAllSockets("updateAlbum", {
                                currentAlbum: data
                            });
                        });
                    } else {
                        this.informAllSockets("updateAlbum", {
                            currentAlbum: {
                                title: "",
                                artwork: ""
                            }
                        });
                    }
                }
            });

            /**
             * Function to catch client disconnect
             */
            ws.on('close', () => {
                log.info(`[SOCKET][${ws.id}] Disconnected!`);
            });

            /**
             * Send init data
             */
            ws.send(this.encrypt({
                instruction: 'init',
                data: {
                    news: config.news.titles,
                    weather: config.weather.details,
                    albums: config.albums,
                    currentAlbum: this.currentAlbum
                }
            }));

            log.info(`[SOCKET][${ws.id}] User connected!`)
        });

        log.info(`[SOCKET] WS started!`);
    }

    /**
     * Function to send info to all sockets
     *
     * @param instruction
     * @param data
     */
    informAllSockets(instruction, data) {
        if(this.socket === null) {
            return;
        }

        this.socket.getWss().clients.forEach(client => {
            // Check if connection is still open
            if (client.readyState !== client.OPEN) return;

            client.send(this.encrypt({
                instruction,
                data
            }));
        });
    }

    /**
     * Function encrypt data before sending
     */
    encrypt(data) {
        const string = JSON.stringify(data);
        return btoa(string);
    }

    /**
     * Function decrypt data from socket
     */
    decrypt(data) {
        const string = atob(data);
        return JSON.parse(string);
    }
}

module.exports = new socket();
