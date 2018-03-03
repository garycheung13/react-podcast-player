import React from 'react';
import ReactHtmlParser from 'react-html-parser';

const ChannelEpisodeList = ({ episodeList, playerActions, player, channelTitle }) => {
    function transform(node) {
        if (node.name === "img") {
            return null;
        }
    }

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
        console.log("rendering podcast episodes");
        return (
            <div onClick={startPodcastFromChannel}>
            <h2>Episodes</h2>
            <hr/>
                <ul>
                    {episodeList.slice(0, 20).map((episode, i) =>
                        <li key={i}>
                            <p>{episode.title}</p>
                            {ReactHtmlParser(episode["description"], { transform: transform })}
                            <button data-podcastLink={episode.enclosure.url} data-podcastTitle={episode.title}>
                                Play Episode
                            </button>
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