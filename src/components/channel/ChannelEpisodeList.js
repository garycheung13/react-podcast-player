import React from 'react';
import PropTypes from 'prop-types';
import Pager from './Pager';
import ChannelListEntry from './ChannelListEntry';

const ChannelEpisodeList = ({ episodeList, playerActions, player, channelTitle, pager, handlePager }) => {
    function startPodcastFromChannel(event) {
        if (event.target.nodeName === "BUTTON" && event.target.classList.contains("media-button")) {
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
            <div>
                <h2>Episodes ({pager.totalItems}) </h2>
                <Pager pager={pager} handlePager={handlePager}/>
                <hr />
                <ul onClick={startPodcastFromChannel}>
                    {episodeList.map((episode, i) =>
                        <ChannelListEntry key={i} episode={episode} player={player} />
                    )}
                </ul>
                <hr/>
                <Pager pager={pager} handlePager={handlePager}/>
            </div>
        );
    } else {
        return (
            <div>Still Loading</div>
        );
    }
};

ChannelEpisodeList.propTypes = {
    episodeList: PropTypes.array,
    playerActions: PropTypes.object.isRequired,
    player: PropTypes.object.isRequired,
    channelTitle: PropTypes.string.isRequired,
    pager: PropTypes.object.isRequired,
}

export default ChannelEpisodeList;