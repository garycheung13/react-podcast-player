import React from 'react';
import ReactHtmlParser from 'react-html-parser';

const ChannelEpisodeList = ({ episodeList, playerActions }) => {
    function transform(node) {
        if (node.name === "img") {
            return null;
        }
    }

    function updatePodcastFactory(episodeURL) {
        const episodeLink = episodeURL;
        return function(event){
            event.preventDefault();
            playerActions.updateCurrentPodcast({url: episodeLink})
        };
    }

    if (episodeList) {
        return (
            <div>
                <ul>
                    {episodeList.slice(0, 10).map((episode, i) =>
                        <li key={i}>
                            <p>{episode.title}</p>
                            {ReactHtmlParser(episode["description"], { transform: transform })}
                            <button onClick={updatePodcastFactory(episode.enclosure.url)}>Play Episode</button>
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