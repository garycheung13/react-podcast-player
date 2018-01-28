import React from 'react';
import {NavLink} from 'react-router-dom';


const navTempStyles = {
    display: "inline-block",
    padding: "20px",
}

const Header = () => {
    return (
        <nav>
            <NavLink style={navTempStyles} to={'/playlist'}>Playlist</NavLink>
            <NavLink style={navTempStyles} to={'/search'}>Search</NavLink>
        </nav>
    );
};

export default Header;