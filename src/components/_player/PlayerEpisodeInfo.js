import React from 'react';
import PropTypes from 'prop-types';

const PlayerEpisodeInfo = ({episodeTitle, podcastTitle}) => {
    return (
        <div className="player__episode-info">
            <h3>{episodeTitle}</h3>
            <h4>{podcastTitle}</h4>
        </div>
    );
};

PlayerEpisodeInfo.propTypes = {
    episodeTitle: PropTypes.string.isRequired,
    podcastTitle: PropTypes.string.isRequired
};

export default PlayerEpisodeInfo;