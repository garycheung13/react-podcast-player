import React from 'react';
import PropTypes from 'prop-types';

const PlayerPlaylistEntry = props => {
    return (
        <div>
            <p onClick={props.loadEpisode}>{props.episode.title}</p>
        </div>
    );
};

PlayerPlaylistEntry.propTypes = {
    episode: PropTypes.object.isRequired
};

export default PlayerPlaylistEntry;