import {h, Component} from 'preact';
import { connect } from "unistore/preact";

class Weather extends Component {
    /**
     * Preact render function
     *
     * @returns {*}
     */
    render() {
        if(this.props.weather.main) {
            return (
                <div className="weather">
                    Rotterdam, Nederland: <br/>
                    {Math.round( this.props.weather.main.temp * 10 ) / 10} &#8451; (Max: {Math.round( this.props.weather.main.temp_max * 10 ) / 10} &#8451; / Min: {Math.round( this.props.weather.main.temp_min * 10 ) / 10} &#8451;)<br/>
                    {this.props.weather.wind.speed} m/s
                </div>
            );
        } else {
            return null;
        }
    }
}

/**
 * Connect the store to the component
 */
export default connect('weather')(Weather);
