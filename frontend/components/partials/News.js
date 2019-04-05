import {h, Component} from 'preact';
import { connect } from "unistore/preact";

import Rss from '../icons/Rss';

class News extends Component {
    constructor() {
        super();

        this.marquee = null;
    }

    componentDidMount() {
        this.marquee.addEventListener('bounce', () => {
            console.log('hoi');
        });
        
        console.log('this.marquee', this.marquee);

        this.marquee.addEventListener('finish', () => {
            console.log('hoi1');
        });

        this.marquee.addEventListener('onfinish', () => {
            console.log('hoi1');
        });

        this.marquee.onfinish = () => {
            console.log('hoi1');
        };
    }

    done() {
        console.log('done!');
    }

    /**
     * Preact render function
     *
     * @returns {*}
     */
    render() {
        return (
            <div className="news">
                <marquee truespeed scrolldelay="10" scrollamount="1" ref={c => this.marquee = c}>
                    <span>Item 1</span>
                    <Rss/>
                    <span>Item 2</span>
                    <Rss/>
                    <span>Item 3</span>
                    <Rss/>
                    <span>Item 4</span>
                    <Rss/>
                    <span>Item 5</span>
                    <Rss/>
                    <span>Item 6</span>
                    <Rss/>
                    <span>Item 7</span>
                    <Rss/>
                    <span>Item 8</span>
                    <Rss/>
                    <span>Item 9</span>
                    <Rss/>
                    <span>Item 10</span>
                </marquee>
            </div>
        );
    }
}

/**
 * Connect the store to the component
 */
export default connect('news')(News);
