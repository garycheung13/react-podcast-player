import React from 'react';
import PropTypes from 'prop-types';

const PlaylistTableRow = props => {
    const widthLimit = {maxWidth: "400px"};

    return (
        <tr>
            <td>{props.episode.podcastEpisodeTitle}</td>
            <td>{props.episode.podcastFrom}</td>
            <td style={widthLimit}>{props.episode.summary}</td>
            <td><button>Fake Play</button></td>
        </tr>
    );
};

PlaylistTableRow.propTypes = {
    episode: PropTypes.object
};

export default PlaylistTableRow;