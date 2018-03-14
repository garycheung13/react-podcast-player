import React from 'react';
import ReactHtmlParser from 'react-html-parser';

const ChannelEpisodeList = ({ episodeList, playerActions, player, channelTitle }) => {
    function startPodcastFromChannel(event) {
        if (event.target.nodeName === "BUTTON") {
            event.preventDefault();
            const url = event.target.getAttribute('data-podcastLink');
            const name = event.target.getAttribute('data-podcastTitle');
            playerActions.updateCurrentPodcast({
                url: url,
                playerIsActive: !(player.url === url && player.playerIsActive),
                podcastTitle: channelTitle,
                episodeTitle: name
            });
        }
    }

    if (episodeList) {
        return (
            <div onClick={startPodcastFromChannel}>
                <h2>Episodes ({episodeList.length}) </h2>
                <hr />
                <ul>
                    {episodeList.slice(0, 5).map((episode, i) =>
                        <li key={i} className="channel__episode-entry">
                            <div className="entry-actions">
                                <button
                                    className="media-button"
                                    data-podcastLink={episode.enclosure.url}
                                    data-podcastTitle={episode.title}>
                                    {(player.url === episode.enclosure.url && player.playerIsActive) ? "❚❚": "▶"}
                                </button>
                            </div>
                            <div className="entry-info">
                                <h4>{episode.title}</h4>
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
                    )}
                </ul>
            </div>
        );
    } else {
        return (
            <div>Still Loading</div>
        );
    }
};

export default ChannelEpisodeList;