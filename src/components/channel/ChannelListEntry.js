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
                <p>
                    {ReactHtmlParser(episode["description"], {
                        transform: function (node) {
                            if (node.name === "img") {
                                return null;
                            }
                        }
                    })}
                </p>
            </div>
        </li>
    );
};

ChannelListEntry.propTypes = {
    episode: PropTypes.object.isRequired,
    player: PropTypes.object.isRequired,
};

export default ChannelListEntry;