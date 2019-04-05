import {h, Component, render} from 'preact';
import {Provider} from 'unistore/preact';
import mitt from 'mitt';

import Socket from './modules/socket';
import store from './modules/store';

import Home from './components/Home';

class App extends Component {
    /**
     * Constructor
     */
    constructor() {
        super();

        Socket.initialize(window.location.host);
        window.events = mitt();
        window.site = {};
        window.site.production = process.env.NODE_ENV === 'production';
    }

    /**
     * Catches the router events
     *
     * @param e
     */
    routerUpdate(e) {
        window.events.emit("router", {
            route: e.url
        });
    }

    /**
     * Preact render function
     *
     * @returns {*}
     */
    render() {
        return (
            <div id="root">
                <div className="container">
                    <Home/>
                </div>
            </div>
        );
    }
}

render(<Provider store={store}><App/></Provider>, document.body);
require('preact/debug');
