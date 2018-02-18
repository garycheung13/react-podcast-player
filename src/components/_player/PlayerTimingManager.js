import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PlayerTimingManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            duration: 0,
            currentSecond: 0
        }

        this.progress = this.progress.bind(this);
        this.testSeek = this.testSeek.bind(this);
        this.interval = null;
    }

    componentWillReceiveProps(nextProps) {
        clearInterval(this.interval); // remember to stop the previous counter
        if (this.props.currentlyPlayingPodcast !== nextProps.currentlyPlayingPodcast) {
            nextProps.currentlyPlayingPodcast.on("load", () => {
                this.setState({
                    duration: nextProps.currentlyPlayingPodcast.duration(),
                    currentSecond: 0
                });
            });

            nextProps.currentlyPlayingPodcast.once("play", () => {
                console.log("evoked play");
                this.progress();
            });

            nextProps.currentlyPlayingPodcast.on("pause", () => {
                console.log("evoked pause");
                clearInterval(this.interval);
            })
        }
    }

    progress() {
        this.interval = setInterval(() => {
            this.setState({
                currentSecond: this.state.currentSecond + 1
            })
        }, 1000)
    }

    testSeek() {
        this.props.currentlyPlayingPodcast.seek(this.state.currentSecond + 10);
        this.setState({
            currentSecond: this.state.currentSecond + 10
        })
    }

    render() {
        return (
            <div>
                <p>{this.state.duration}</p>
                <p>{this.state.currentSecond}</p>
                <button onClick={this.testSeek}>Test Seek</button>
            </div>
        );
    }
}

PlayerTimingManager.propTypes = {
    currentlyPlayingPodcast: PropTypes.object
};

export default PlayerTimingManager;