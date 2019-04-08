import {h, Component} from 'preact';
import { connect } from "unistore/preact";

import Rss from '../icons/Rss';

class News extends Component {
    /**
     * Preact render function
     *
     * @returns {*}
     */
    render() {
        return (
            <div className="news">
                {this.props.news &&
                    <marquee truespeed scrolldelay="10" scrollamount="1" ref={c => this.marquee = c}>
                        {this.props.news.map((newsItem, index) => (
                            <span key={index}>
                                <span>{newsItem}</span>
                                <Rss/>
                            </span>
                        ))}
                    </marquee>
                }
            </div>
        );
    }
}

/**
 * Connect the store to the component
 */
export default connect('news')(News);
