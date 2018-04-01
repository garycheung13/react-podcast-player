import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faFastForward, faFastBackward} from '@fortawesome/fontawesome-free-solid';

const PlayerControls = ({ playerIsActive, pause , play, intervalSkip, currentSecond, duration, currentlyPlayingPodcast }) => {

    // determine which button gets rendered
    function renderButton(playerStatus) {
        if (playerStatus) {
            return <button onClick={pause} className="media-button">❚❚</button>
        } else {
            return <button onClick={play} className="media-button">▶</button>
        }
    }
    const SKIP_INTERVAL_SECONDS = 15;
    // default state (no podcast is an empty object)
    let noPodcastLoaded = Object.keys(currentlyPlayingPodcast).length === 0;
    return (
        <div className="player-buttons">
            <button
                className="media-button"
                disabled={currentSecond < SKIP_INTERVAL_SECONDS || noPodcastLoaded}
                onClick={() => {intervalSkip(-SKIP_INTERVAL_SECONDS);}}>
                <FontAwesomeIcon icon={faFastBackward} className="player-fa-icon"/>
            </button>
            {renderButton(playerIsActive)}
            <button
                className="media-button"
                disabled={currentSecond + SKIP_INTERVAL_SECONDS > duration || noPodcastLoaded}
                onClick={() => {intervalSkip(SKIP_INTERVAL_SECONDS);}}>
                <FontAwesomeIcon icon={faFastForward} className="player-fa-icon"/>
            </button>
        </div>
    );
};

PlayerControls.propTypes = {
    playerIsActive: PropTypes.bool.isRequired,
    pause: PropTypes.func.isRequired,
    play: PropTypes.func.isRequired,
    intervalSkip: PropTypes.func.isRequired
};

export default PlayerControls;