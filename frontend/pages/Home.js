import {h, Component} from 'preact';

import News from "../components/partials/News";
import Weather from "../components/partials/Weather";

export default class Home extends Component {
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
