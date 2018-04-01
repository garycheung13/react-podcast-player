import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faVolumeOff } from '@fortawesome/fontawesome-free-solid';

const PlayerVolumeControl = ({ changeVolume }) => {
    return (
        <div className="player__volume" onInput={(e) => {
            changeVolume(e.target.value);
        }}>
            <FontAwesomeIcon icon={faVolumeOff} />
            <input
                type="range"
                name="volume"
                id="volume-slider"
                min="0.0"
                max="1.0"
                step="0.1"
                defaultValue="1.0"
            />
        </div>
    );
};

PlayerVolumeControl.propTypes = {
    changeVolume: PropTypes.func.isRequired,
};

export default PlayerVolumeControl;