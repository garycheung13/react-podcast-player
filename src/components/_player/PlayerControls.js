import React from 'react';
import PropTypes from 'prop-types';

const PlayerControls = ({ playerIsActive, pause , play, intervalSkip }) => {

    // determine which button gets rendered
    function renderButton(playerStatus) {
        if (playerStatus) {
            return <button onClick={pause} className="media-button">❚❚</button>
        } else {
            return <button onClick={play} className="media-button">▶</button>
        }
    }
    return (
        <div className="player-buttons">
            <button className="media-button" data-skipInterval="-10" onClick={intervalSkip}>–</button>
            {renderButton(playerIsActive)}
            <button className="media-button" data-skipInterval="+10" onClick={intervalSkip}>+</button>
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