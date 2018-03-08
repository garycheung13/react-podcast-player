import React from 'react';
import PropTypes from 'prop-types';
import unescape from 'unescape';

const ChannelSummary = ({summary}) => {
    return (
        <div className="channel__summary">
            <h2>About the Show</h2>
            <hr/>
            <p>{unescape(summary)}</p>
        </div>
    );
};

ChannelSummary.propTypes = {
    summary: PropTypes.string
};

export default ChannelSummary;