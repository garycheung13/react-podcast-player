import React from 'react';
import PropTypes from 'prop-types';

const PlayerControls = ({ playerIsActive, currentlyPlayingPodcast, pause }) => {
    return (
        <div>
            <button onClick={pause}>Pause</button>
        </div>
    );
};

PlayerControls.propTypes = {
    playerIsActive: PropTypes.bool.isRequired,
    currentlyPlayingPodcast: PropTypes.object,
    pause: PropTypes.func.isRequired
};

export default PlayerControls;