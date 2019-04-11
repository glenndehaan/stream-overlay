import {h, Component} from 'preact';
import { connect } from "unistore/preact";

class Album extends Component {
    /**
     * Preact render function
     *
     * @returns {*}
     */
    render() {
        if(this.props.currentAlbum && this.props.currentAlbum.title !== "") {
            return (
                <div className="album">
                    <div>
                        <span><strong>Currently Playing:</strong></span><br/>
                        <span>{this.props.currentAlbum.title}</span><br/><br/>
                        <span><img src={this.props.currentAlbum.artwork} height="200" alt="Artwork"/></span>
                    </div>
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
export default connect('currentAlbum')(Album);
