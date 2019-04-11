import Sockette from 'sockette';
import store from './store';

export default new class Socket {
    /**
     * Function to setup the socket connection
     *
     * @param url
     */
    initialize(url) {
        this.config = {
            url: `ws://${url}/`
        };
        this.ws = null;
        this.id = "";
        this.initialConnect = true;

        this.setup();
    }

    /**
     * Create socket connection with ws
     */
    setup() {
        this.ws = new Sockette(this.config.url, {
            timeout: 5e3,
            maxAttempts: 10,
            onopen: () => {
                if(this.initialConnect) {
                    this.initialConnect = false;
                } else {
                    this.send("general_wants_update", {})
                }

                console.log('[SOCKET] Connected!');
            },
            onmessage: (e) => this.message(e.data),
            onreconnect: () => console.warn('[SOCKET] Reconnecting...'),
            onclose: () => console.warn('[SOCKET] Closed!'),
            onerror: e => console.error('[SOCKET] Error:', e),
            onmaximum: () => {
                console.warn('[SOCKET] Failed to reconnect!');
                this.ws.close();
            }
        });
    }

    /**
     * Function to handle all incoming messages
     *
     * @param data
     */
    message(data) {
        const decodedMessage = atob(data);
        const message = JSON.parse(decodedMessage);

        if(message.instruction === "init") {
            console.log('[SOCKET] Init', message.data);

            store.setState(message.data);
        }

        if(message.instruction === "update") {
            console.log('[SOCKET] Update', message.data);

            store.setState(message.data);
        }

        if(message.instruction === "news") {
            console.log('[SOCKET] News', message.data);

            store.setState(message.data);
        }

        if(message.instruction === "weather") {
            console.log('[SOCKET] Weather', message.data);

            store.setState(message.data);
        }

        if(message.instruction === "updateAlbum") {
            console.log('[SOCKET] updateAlbum', message.data);

            store.setState(message.data);
        }
    }

    /**
     * Send a message to the server
     *
     * @param instruction
     * @param data
     */
    send(instruction, data) {
        this.ws.send(this.encrypt({
            instruction,
            data
        }));
    }

    /**
     * Encrypt a message
     *
     * @param data
     * @return {string}
     */
    encrypt(data) {
        const string = JSON.stringify(data);
        return btoa(string);
    }
}
