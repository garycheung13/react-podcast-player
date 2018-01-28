import React from 'react';
import PropTypes from 'prop-types';
import PlayerPlaylistEntry from './PlayerPlaylistEntry';

const PlayerPlaylist = props => {
    return (
        <div>
            {props.playlist.map(episode => 
                <PlayerPlaylistEntry key={episode.id} episode={episode} loadEpisode={props.bindEpisode(episode)}/>
            )}
        </div>
    );
};

PlayerPlaylist.propTypes = {
    playlist: PropTypes.array.isRequired
};

export default PlayerPlaylist;