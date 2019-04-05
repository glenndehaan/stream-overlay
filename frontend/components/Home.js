import {h, Component} from 'preact';
import { connect } from "unistore/preact";

import News from "./partials/News";

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
            </div>
        );
    }
}

/**
 * Connect the store to the component
 */
export default connect('servers,matches,lang')(Home);
