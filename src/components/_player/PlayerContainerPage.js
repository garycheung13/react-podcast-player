import React, { Component } from 'react';
import { Howl, Howler } from 'howler';
import PlayerEpisodeInfo from './PlayerEpisodeInfo';
import PlayerTimingManager from './PlayerTimingManager';
import PlayerVolumeControl from './PlayerVolumeControl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as playerActions from '../../actions/playerActions';

class PlayerContainerPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentlyPlayingPodcast: {},
            currentPodcastTime: 0,
            volumeLevel: 1.0
        }
        // function bindings
        this.changeVolume = this.changeVolume.bind(this);
        this.createHowlObject = this.createHowlObject.bind(this);
        this.playPodcast = this.playPodcast.bind(this);
        this.pausePodcast = this.pausePodcast.bind(this);
    }

    createHowlObject(src) {
        return new Howl({
            src: src,
            html5: true,
            onend: () => {
                this.props.actions.playerActions.updateCurrentPodcast({
                    playerIsActive: false
                });
            }
        });
    }

    playPodcast() {
        if (!this.props.player.playerIsActive && Object.keys(this.state.currentlyPlayingPodcast).length > 0) {
            this.props.actions.playerActions.updateCurrentPodcast({
                playerIsActive: true
            });
        }
    }

    changeVolume(volumeLevel) {
        Howler.volume(volumeLevel);
    }

    pausePodcast() {
        if (this.props.player.playerIsActive) {
            this.props.actions.playerActions.updateCurrentPodcast({
                playerIsActive: false
            });
        }
    }

    // construct the howl object when url is recieved from store
    componentWillReceiveProps(nextProps) {
        // if the url is different, create a howl object
        if (this.props.player.url !== nextProps.player.url) {
            // remove the old podcast if needed
            if (Object.keys(this.state.currentlyPlayingPodcast).length > 0) {
                this.state.currentlyPlayingPodcast.unload();
            }
            const nextPodcast = this.createHowlObject(nextProps.player.url);
            this.setState({
                currentlyPlayingPodcast: nextPodcast,
            });
        }
    }

    // handles play and stop operations,
    // only this function is allowed to pause and play content
    // all other components flip flags
    componentWillUpdate(nextProps, nextState) {
        // stop whatever podcast is playing
        if (this.props.player.playerIsActive) {
            this.state.currentlyPlayingPodcast.pause();
        }
        // is active flag is on, trigger a play on the current podcast loaded
        if (nextProps.player.playerIsActive && Object.keys(nextState.currentlyPlayingPodcast).length > 0) {
            nextState.currentlyPlayingPodcast.play();
        }
    }

    render() {
        return (
            <div className="player-area">
                <PlayerEpisodeInfo
                    episodeTitle={this.props.player.episodeTitle}
                    podcastTitle={this.props.player.podcastTitle}
                />
                <PlayerTimingManager
                    currentlyPlayingPodcast={this.state.currentlyPlayingPodcast}
                    playerIsActive={this.props.player.playerIsActive}
                    pause={this.pausePodcast}
                    play={this.playPodcast}
                />
                <PlayerVolumeControl
                    changeVolume={this.changeVolume}
                />
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        queue: state.queue,
        player: state.player
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            playerActions: bindActionCreators(playerActions, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainerPage);
