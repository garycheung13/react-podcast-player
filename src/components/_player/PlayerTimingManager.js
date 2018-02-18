import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PlayerTimingManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            duration: 0
        }
    }

    componentWillReceiveProps(nextProps) {
        nextProps.currentlyPlayingPodcast.on("load", () => {
            this.setState({
                duration: nextProps.currentlyPlayingPodcast.duration()
            })
        });
    }

    render() {
        return (
            <div>
                {this.state.duration}
            </div>
        );
    }
}

PlayerTimingManager.propTypes = {
    currentlyPlayingPodcast: PropTypes.object
};

export default PlayerTimingManager;