import React, { Component } from 'react';
import PlayerControls from './PlayerControls';
import { formatTimeDisplay } from '../../util/timeConversion';
import PropTypes from 'prop-types';

class PlayerTimingManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            duration: 0,
            currentSecond: 0
        }

        this.progress = this.progress.bind(this);
        this.seek = this.seek.bind(this);
        this.timeUpdate = this.timeUpdate.bind(this);
        this.intervalSkip = this.intervalSkip.bind(this);
        this.interval = null; // references the setinterval call later
    }

    componentWillReceiveProps(nextProps) {
        clearInterval(this.interval); // remember to stop the previous counter
        // if a new podcast is detected, bind some timing related events to it
        if (this.props.currentlyPlayingPodcast !== nextProps.currentlyPlayingPodcast) {
            nextProps.currentlyPlayingPodcast.on("load", () => {
                this.setState({
                    duration: nextProps.currentlyPlayingPodcast.duration(),
                    currentSecond: 0
                });
            });

            nextProps.currentlyPlayingPodcast.on("play", () => {
                this.progress();
            });

            nextProps.currentlyPlayingPodcast.on("pause", () => {
                clearInterval(this.interval);
            });

            nextProps.currentlyPlayingPodcast.on("seek", () => {
                this.setState({
                    currentSecond: this.props.currentlyPlayingPodcast.seek()
                })
            });

            nextProps.currentlyPlayingPodcast.on("end", () => {
                // reset the current second on end
                // (has the side effect of hiding when the interval sometimes doesnt clear in time)
                this.setState({
                    currentSecond: 0
                })
            });
        }
    }

    progress() {
        this.interval = setInterval(() => {
            // ensure that the progress doesnt exceed duration
            if (this.state.duration === this.state.currentSecond) {
                clearInterval(this.interval);
            } else {
                this.setState({
                    currentSecond: this.state.currentSecond + 1
                })
            }
        }, 1000)
    }

    timeUpdate(currentTime, duration) {
        if (duration) {
            return `scaleX(${currentTime / duration})`;
        } else {
            return `scaleX(0)`;
        }
    }

    seek(event) {
        event.preventDefault();
        if (Object.keys(this.props.currentlyPlayingPodcast).length > 0) {
            const clickPos = event.clientX;
            const boundingBox = event.currentTarget.getBoundingClientRect();
            /* subtract left distance to remove distance from left from calculations */
            const newPos = (this.state.duration * (clickPos - boundingBox.left)) / boundingBox.width;
            this.props.currentlyPlayingPodcast.seek(newPos);
        }
    }

    intervalSkip(event) {
        if (Object.keys(this.props.currentlyPlayingPodcast).length > 0) {
            const interval = event.target.getAttribute("data-skipInterval");
            console.log(interval);
            // this.props.currentlyPlayingPodcast.seek(this.state.currentSecond + interval);
        }
    }

    render() {
        const podcastProgressStyles = {
            transform: this.timeUpdate(this.state.currentSecond, this.state.duration)
        }

        return (
            <div className="player__playback-container">
                <PlayerControls
                    playerIsActive={this.props.playerIsActive}
                    pause={this.props.pause}
                    play={this.props.play}
                    intervalSkip={this.intervalSkip}
                />
                <div className="progress-container">
                    <div className="progress__time">{formatTimeDisplay(this.state.currentSecond)}</div>
                    <div className="player-bar" onClick={this.seek}>
                        <div className="player-bar__progress" style={podcastProgressStyles}></div>
                    </div>
                    <div className="progress__time">{formatTimeDisplay(this.state.duration)}</div>
                </div>
            </div>
        );
    }
}

PlayerTimingManager.propTypes = {
    currentlyPlayingPodcast: PropTypes.object,
    playerIsActive: PropTypes.bool.isRequired,
    pause: PropTypes.func.isRequired,
    play: PropTypes.func.isRequired
};

export default PlayerTimingManager;