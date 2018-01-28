import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = (props) => {
    return (
        <div>
            <form>
                <input
                    type="search"
                    name="podcastName"
                    id="searchBar"
                    placeholder="enter podcast name"
                    onChange={props.handleChange}
                />
                <button onClick={props.handleSubmit}>Search</button>
            </form>
        </div>
    );
};

SearchBar.propTypes = {
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
};

export default SearchBar;
