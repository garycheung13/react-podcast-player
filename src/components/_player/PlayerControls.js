import React from 'react';
import PropTypes from 'prop-types';

const PlayerControls = ({ playerIsActive, pause , play }) => {

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
            <button className="media-button">–</button>
            {renderButton(playerIsActive)}
            <button className="media-button">+</button>
        </div>
    );
};

PlayerControls.propTypes = {
    playerIsActive: PropTypes.bool.isRequired,
    pause: PropTypes.func.isRequired,
    play: PropTypes.func.isRequired
};

export default PlayerControls;