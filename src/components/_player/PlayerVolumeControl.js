import React from 'react';
import PropTypes from 'prop-types';

const PlayerVolumeControl = ({changeVolume}) => {
    return (
        <div className="player__volume">
            <input
                type="range"
                name="volume"
                id="volume-slider"
                min="0.0"
                max="1.0"
                step="0.1"
                defaultValue="1.0"
                onInput={changeVolume}
            />
        </div>
    );
};

PlayerVolumeControl.propTypes = {
    changeVolume: PropTypes.func.isRequired
};

export default PlayerVolumeControl;