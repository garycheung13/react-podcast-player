import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ handleFocus, handleChange, handleSubmit }) => {
    return (
        <div>
            <form className="search-area__form">
                <input
                    type="search"
                    name="podcastName"
                    id="searchBar"
                    placeholder="Enter the name of a Podcast (e.g. This American Life)"
                    className="search-area__input"
                    onChange={handleChange}
                />
                <button className="search-area__button" onClick={handleSubmit}>Search</button>
            </form>
        </div>
    );
};

SearchBar.propTypes = {
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
};

export default SearchBar;
