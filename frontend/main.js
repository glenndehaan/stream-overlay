import {h, Component, render} from 'preact';
import {Provider} from 'unistore/preact';
import {Router} from 'preact-router';

import Socket from './modules/socket';
import store from './modules/store';

import Home from './pages/Home';
import Admin from './pages/Admin';

class App extends Component {
    /**
     * Constructor
     */
    constructor() {
        super();

        Socket.initialize(window.location.host);
        window.site = {};
        window.site.production = process.env.NODE_ENV === 'production';
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
                    <Router>
                        <Home path="/"/>
                        <Admin path="/admin"/>
                    </Router>
                </div>
            </div>
        );
    }
}

render(<Provider store={store}><App/></Provider>, document.body);
require('preact/debug');
