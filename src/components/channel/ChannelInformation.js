import React from 'react';
import PropTypes from 'prop-types';

const ChannelInformation = props => {
    const imageStyles = {
        "maxWidth": "250px",
        "maxHeight": "250px"
    };

    //replace the image tag with the itunes one if there is a 403
    //https://stackoverflow.com/questions/38626629/onerror-in-img-tag-in-react
    function handleImageSrcError(event) {
        event.persist();
        // this is hardcoded at the moment, but the url contains a query param which should allow it be possible programmatically
        fetch("https://itunes.apple.com/lookup?id=201671138")
            .then(res => res.json())
            .then(output => {
                return event.target.setAttribute("src", output.results[0].artworkUrl600);
            });
        };

    return (
        <div>
            <img onError={handleImageSrcError} style={imageStyles} src={props.image} alt="podcast cover art"/>
            <h1>{props.title}</h1>
            <p>{props.summary}</p>
        </div>
    );
};

ChannelInformation.propTypes = {
    title: PropTypes.string,
    image: PropTypes.string,
    summary: PropTypes.string
};

export default ChannelInformation;