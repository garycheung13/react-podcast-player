import React from 'react';
import PropTypes from 'prop-types';
import PlaylistTableRow from './PlaylistTableRow';

const PlaylistTable = props => {
    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Episode</th>
                    <th>Podcast</th>
                    <th>Summary</th>
                    <th>Play</th>
                </tr>
            </thead>
            <tbody>
                {props.playlist.map((episode, index) => <PlaylistTableRow key={index} episode={episode}/>)}
            </tbody>
        </table>
    );
};

PlaylistTable.propTypes = {
    playlist: PropTypes.array
};

export default PlaylistTable;