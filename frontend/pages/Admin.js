import {h, Component} from 'preact';
import { connect } from "unistore/preact";

import socket from '../modules/socket';

class Admin extends Component {
    /**
     * Constructor
     */
    constructor() {
        super();

        this.album = null;
    }

    /**
     * Update function to let the socket know the album updated
     */
    updateAlbum() {
        socket.send("updateAlbum", {
            album: JSON.parse(this.album.value)
        });
    }

    /**
     * Preact render function
     *
     * @returns {*}
     */
    render() {
        return (
            <div className="starter-template">
                <h2>Current Album</h2>
                <br/>
                <select name="album" title="album" ref={c => this.album = c}>
                    <option selected disabled value="false">Select an album</option>
                    <option value={`${JSON.stringify({title: '', catalogNumber: ''})}`}>None</option>
                    {this.props.albums.map((album, key) => (
                        <option key={key} value={JSON.stringify(album)}>{album.title}</option>
                    ))}
                </select><br/><br/>
                <button title="Update the album" onClick={() => this.updateAlbum()}>Update!</button>
            </div>
        );
    }
}

/**
 * Connect the store to the component
 */
export default connect('albums,currentAlbum')(Admin);
