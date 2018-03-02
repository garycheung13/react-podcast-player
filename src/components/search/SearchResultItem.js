import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SearchResultItem = props => {
    return (
        <div className="search-result__item">
            <img src={props.result.artworkUrl100} alt="podcast cover artwork" />
            <div className="search-result__item-text">
                <h3>{props.result.trackName}</h3>
                <h4>{props.result.artistName}</h4>
                <button>
                    <Link to={`/channel?name=${encodeURIComponent(props.result.feedUrl)}&id=${props.result.trackId}`}>View Channel</Link>
                </button>
            </div>
        </div>
    );
};

SearchResultItem.propTypes = {
    result: PropTypes.object
};

export default SearchResultItem;