import {h, Component} from 'preact';
import { connect } from "unistore/preact";

import News from "./partials/News";
import Weather from "./partials/Weather";

class Home extends Component {
    /**
     * Preact render function
     *
     * @returns {*}
     */
    render() {
        return (
            <div className="starter-template">
                <News/>
                <Weather/>
            </div>
        );
    }
}

/**
 * Connect the store to the component
 */
export default connect('servers,matches,lang')(Home);
