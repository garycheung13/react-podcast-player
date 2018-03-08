import React from 'react';
import PropTypes from 'prop-types';

const PlayerControls = ({ playerIsActive, pause , play }) => {

    // determine which button gets rendered
    function renderButton(playerStatus) {
        if (playerStatus) {
            return <button onClick={pause} className="play-button">❚❚</button>
        } else {
            return <button onClick={play} className="play-button">▶</button>
        }
    }
    return (
        <div className="player-buttons">
            {renderButton(playerIsActive)}
        </div>
    );
};

PlayerControls.propTypes = {
    playerIsActive: PropTypes.bool.isRequired,
    pause: PropTypes.func.isRequired,
    play: PropTypes.func.isRequired
};

export default PlayerControls;