import React from 'react';
import ReactHtmlParser from 'react-html-parser';

const ChannelEpisodeList = ({ episodeList, playerActions, player }) => {
    function transform(node) {
        if (node.name === "img") {
            return null;
        }
    }

    function startPodcastFromChannel(event) {
        event.preventDefault();
        const url = event.target.getAttribute('data-podcastLink');
        // if (player.url === url && player.playerIsActive) {
        //     playerActions.updateCurrentPodcast({
        //         url: url,
        //         playerIsActive: false
        //     })
        // } else {
        //     playerActions.updateCurrentPodcast({
        //         url: url,
        //         playerIsActive: true
        //     })
        // }
        playerActions.updateCurrentPodcast({
            url: url,
            playerIsActive: !(player.url === url && player.playerIsActive)
        })

    }

    if (episodeList) {
        console.log("render");
        return (
            <div>
                <ul>
                    {episodeList.slice(0, 10).map((episode, i) =>
                        <li key={i}>
                            <p>{episode.title}</p>
                            {ReactHtmlParser(episode["description"], { transform: transform })}
                            <button data-podcastLink={episode.enclosure.url} onClick={startPodcastFromChannel}>Play Episode</button>
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