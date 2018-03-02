import React, { Component } from 'react';
import { Howl } from 'howler';
import PlayerControls from './PlayerControls';
import PlayerTimingManager from './PlayerTimingManager';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as playerActions from '../../actions/playerActions';

class PlayerContainerPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentlyPlayingPodcast: {},
            currentPodcastTime: 0
        }
        // function bindings
        this.createHowlObject = this.createHowlObject.bind(this);
        this.playPodcast = this.playPodcast.bind(this);
        this.pausePodcast = this.pausePodcast.bind(this);
        this.logProps = this.logProps.bind(this);
    }

    logProps() {
        console.log(this.props);
        console.log(this.state);
    }

    createHowlObject(src) {
        return new Howl({
            src: src,
            html5: true,
            onend: () => {
                this.props.actions.playerActions.updateCurrentPodcast({
                    url: this.props.player.url,
                    playerIsActive: false,
                    podcastTitle: this.props.player.podcastTitle,
                    episodeTitle: this.props.player.episodeTitle
                });
            }
        });
    }

    playPodcast() {
        if (!this.props.player.playerIsActive && Object.keys(this.state.currentlyPlayingPodcast).length > 0) {
            console.log("podcast played");
            this.props.actions.playerActions.updateCurrentPodcast({
                url: this.props.player.url,
                playerIsActive: true,
                podcastTitle: this.props.player.podcastTitle,
                episodeTitle: this.props.player.episodeTitle
            });
        }
    }

    pausePodcast() {
        if (this.props.player.playerIsActive) {
            console.log("podcast paused");
            this.props.actions.playerActions.updateCurrentPodcast({
                url: this.props.player.url,
                playerIsActive: false,
                podcastTitle: this.props.player.podcastTitle,
                episodeTitle: this.props.player.episodeTitle
            });
        }
    }

    // construct the howl object when url is recieved from store
    componentWillReceiveProps(nextProps) {
        // if the url is different, create a howl object
        if (this.props.player.url !== nextProps.player.url) {
            console.log("howl created");
            // remove the old podcast if needed
            if (Object.keys(this.state.currentlyPlayingPodcast).length > 0) {
                console.log("removing previous podcast");
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
            console.log("podcast paused");
            this.state.currentlyPlayingPodcast.pause();
        }
        // is active flag is on, trigger a play on the current podcast loaded
        if (nextProps.player.playerIsActive && Object.keys(nextState.currentlyPlayingPodcast).length > 0) {
            console.log("podcast played");
            nextState.currentlyPlayingPodcast.play();
        }
    }

    render() {
        return (
            <div className="player-area">
                {this.logProps()}
                <PlayerControls
                    player={this.props.player}
                    currentlyPlayingPodcast={this.state.currentlyPlayingPodcast}
                    pause={this.pausePodcast}
                    play={this.playPodcast}
                />
                <PlayerTimingManager
                    currentlyPlayingPodcast={this.state.currentlyPlayingPodcast}
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