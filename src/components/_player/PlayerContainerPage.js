import React, { Component } from 'react';
import { Howl } from 'howler';
import PlayerControls from './PlayerControls';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as playerActions from '../../actions/playerActions';

class PlayerContainerPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerIsActive: false,
            currentlyPlayingPodcast: null
        }
        // function bindings
        this.createHowlObject = this.createHowlObject.bind(this);
        this.pausePodcast = this.pausePodcast.bind(this);
    }

    logProps() {
        console.log(this.props);
        console.log(this.state);
    }

    createHowlObject(src) {
        return new Howl({
            src: src,
            html5: true
        });
    }

    pausePodcast(){
        if (this.props.player.playerIsActive){
            console.log("podcast paused");
            this.state.currentlyPlayingPodcast.pause();
            this.props.actions.playerActions.updateCurrentPodcast({
                url: this.props.player.url,
                playerIsActive: false
            });
        }
     }

    // construct the howl object when url is recieved from store
    componentWillReceiveProps(nextProps) {
        // if the url is different, create a howl object
        if (this.props.player.url !== nextProps.player.url) {
            console.log("howl created");
            this.setState({
                currentlyPlayingPodcast: this.createHowlObject(nextProps.player.url),
            });
        }
    }

    // handles play and stop operations
    componentWillUpdate(nextProps, nextState) {
        // stop whatever podcast is playing
        if (this.props.player.playerIsActive) {
            this.state.currentlyPlayingPodcast.stop();
        }
        // is active flag is on, trigger a play on the current podcast loaded
        if (nextProps.player.playerIsActive) {
            nextState.currentlyPlayingPodcast.play();
        }
    }

    render() {
        return (
            <div>
                {this.logProps()}
                <PlayerControls
                    playerIsActive={this.props.player.playerIsActive}
                    currentlyPlayingPodcast={this.state.currentlyPlayingPodcast}
                    pause={this.pausePodcast}
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