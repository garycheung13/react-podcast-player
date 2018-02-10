import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ handleChange, handleSubmit }) => {
    return (
        <div>
            <form>
                <input
                    type="search"
                    name="podcastName"
                    id="searchBar"
                    placeholder="enter podcast name"
                    onChange={handleChange}
                />
                <button onClick={handleSubmit}>Search</button>
            </form>
        </div>
    );
};

SearchBar.propTypes = {
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
};

export default SearchBar;
