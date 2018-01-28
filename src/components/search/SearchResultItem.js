import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const SearchResultItem = props => {
    const displayStyles = {
        display: "inline-block",
        width: "33%",
        paddingBottom: "25px"
    };

    return (
        <div style = {displayStyles}>
            <img src={props.result.artworkUrl100} alt="podcast cover artwork"/>
            <h3>{props.result.trackName}</h3>
            <h4>{props.result.artistName}</h4>
            <button>
                <Link to={'/channel?name=' + encodeURIComponent(props.result.feedUrl)}>View Channel</Link>
            </button>
            <button>
                <Link to={`/channel?name=${encodeURIComponent(props.result.feedUrl)}&id=${props.result.trackId}`}>View Channel w/ template</Link>
            </button>
        </div>
    );
};

SearchResultItem.propTypes = {
    result: PropTypes.object
};

export default SearchResultItem;