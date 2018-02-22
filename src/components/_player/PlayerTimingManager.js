import React, { Component } from 'react';
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
                console.log("firing play event");
                this.progress();
            });

            nextProps.currentlyPlayingPodcast.on("pause", () => {
                console.log("firing pause event");
                clearInterval(this.interval);
            });

            nextProps.currentlyPlayingPodcast.on("seek", () => {
                console.log("firing seek event");
                this.setState({
                    currentSecond: this.props.currentlyPlayingPodcast.seek()
                })
            });
        }
    }

    progress() {
        this.interval = setInterval(() => {
            // ensure that the progress doesnt exceed duration
            if (this.state.duration === this.state.currentSecond) {
                clearInterval(this.interval);
                this.setState({
                    currentSecond: this.state.duration
                })
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
            const newPos = (this.state.duration * clickPos) / boundingBox.width;
            this.props.currentlyPlayingPodcast.seek(newPos);
        }
    }

    render() {
        const barStyles = {
            height: '10px',
            width: '80%',
            backgroundColor: '#000000'
        }

        const podcastProgressStyles = {
            height: 'inherit',
            backgroundColor: '#4961C1',
            transformOrigin: 'left',
            transform: this.timeUpdate(this.state.currentSecond, this.state.duration)
        }

        return (
            <div>
                <p>{formatTimeDisplay(this.state.duration)}</p>
                <p>{formatTimeDisplay(this.state.currentSecond)}</p>
                <div className="progressBar" onClick={this.seek} style={barStyles}>
                    <div className="podcastProgress" style={podcastProgressStyles}></div>
                </div>
            </div>
        );
    }
}

PlayerTimingManager.propTypes = {
    currentlyPlayingPodcast: PropTypes.object
};

export default PlayerTimingManager;