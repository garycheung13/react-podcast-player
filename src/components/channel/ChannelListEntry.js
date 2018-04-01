import React from 'react';
import PropTypes from 'prop-types';
import unescape from 'unescape';
import ReactHtmlParser from 'react-html-parser';

const ChannelListEntry = ({ episode, player }) => {
    function podcastHasEnclosure(episode) {
        if (episode.hasOwnProperty("enclosure")) {
            return (
                <button
                    className="media-button"
                    data-podcastLink={episode.enclosure.url}
                    data-podcastTitle={episode.title}>
                    {(player.url === episode.enclosure.url && player.playerIsActive) ? "❚❚" : "▶"}
                </button>
            )
        } else {
            return (
                <button className="media-button">▶</button>
            )
        }
    }

    return (
        <li className="channel__episode-entry">
            <div className="entry-actions">
                {podcastHasEnclosure(episode)}
            </div>
            <div className="entry-info">
                <h4>{unescape(episode.title)}</h4>
                <span onClick={(e) => {
                    const detailsContainer = e.target.nextSibling;
                    detailsContainer.classList.toggle("show-details");
                    if (detailsContainer.classList.contains("show-details")){
                        e.target.innerHTML = "Hide Details";
                    } else {
                        e.target.innerHTML = "Show Details";
                    }
                }}>Show Details</span>
                <p className="entry-info__detail-container">
                    {ReactHtmlParser(episode["description"], {
                        transform: function (node) {
                            if (node.name === "img") {
                                return null;
                            }
                        }
                    })}
                </p>
                {/* <button onClick={(e) => {
                    const textElement = e.target.previousSibling
                    textElement.classList.toggle("info-open");
                    if (textElement.classList.contains("info-open")) {
                        e.target.innerHTML = "Show Less"
                    } else {
                        e.target.innerHTML = "Show More"
                    }
                }}>Show More</button> */}
            </div>
        </li>
    );
};

ChannelListEntry.propTypes = {
    episode: PropTypes.object.isRequired,
    player: PropTypes.object.isRequired,
};

export default ChannelListEntry;