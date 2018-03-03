import React from 'react';
import PropTypes from 'prop-types';
import unescape from 'unescape';

const ChannelInformation = ({title, author, image, id}) => {
    //replace the image tag with the itunes one if there is a 403
    //https://stackoverflow.com/questions/38626629/onerror-in-img-tag-in-react
    function handleImageSrcError(event) {
        event.persist();
        fetch(`https://itunes.apple.com/lookup?id=${id}`)
            .then(res => res.json())
            .then(output => {
                return event.target.setAttribute("src", output.results[0].artworkUrl600);
            });
    };

    return (
        <div className="channel__info">
            <img onError={handleImageSrcError} src={image} alt="podcast cover art" />
            <h2>{unescape(title)}</h2>
            <h3>{unescape(author)}</h3>
        </div>
    );
};

ChannelInformation.propTypes = {
    title: PropTypes.string,
    image: PropTypes.string,
    id: PropTypes.string,
};

export default ChannelInformation;