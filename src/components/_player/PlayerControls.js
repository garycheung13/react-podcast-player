import React from 'react';
import PropTypes from 'prop-types';

const PlayerControls = ({ player, currentlyPlayingPodcast, pause , play, duration }) => {

    // determine which button gets rendered
    function renderButton(playerStatus) {
        if (playerStatus) {
            return <button onClick={pause}>Pause</button>
        } else {
            return <button onClick={play}>Play</button>
        }
    }
    return (
        <div>
            <h4>{player.episodeTitle}</h4>
            <p>{player.podcastTitle}</p>
            {renderButton(player.playerIsActive)}
        </div>
    );
};

PlayerControls.propTypes = {
    player: PropTypes.object.isRequired,
    currentlyPlayingPodcast: PropTypes.object,
    pause: PropTypes.func.isRequired,
    play: PropTypes.func.isRequired
};

export default PlayerControls;