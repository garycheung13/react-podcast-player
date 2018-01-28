import React from 'react';
import {formatTimeDisplay} from '../../utilityFunctions/utilityFunctions';
import '../../styles/PlayerUI.css';

const PlayerUI = (props) => {
    function renderMainButton() {
        if (props.playerIsActive) {
            return <button onClick={props.pauseFunc}>Pause</button>
        } else {
            return <button onClick={props.playFunc}>Play</button>
        }
    }

    function getTransformPercentage() {
        /* if current podcast not set(equal to null), set progress to zero */
        if (!props.currentPodcast) {
            return 0;
        } else {
            return props.currentPlaytime / props.duration;
        }
    }
    
    let progressBarStyles = {
        height: '10px',
        width: '100%',
        backgroundColor: '#000000'
    }

    let podcastProgressStyles = {
        height: 'inherit',
        backgroundColor: '#4961C1',
        transformOrigin: 'left',
        transform: 'scaleX(' + getTransformPercentage() + ')'
    }

    return (
        <div>
            {props.currentPodcast ? props.currentPodcast.title: "No Episode Playing"}
            {renderMainButton()}
            <div className="progressBar" style={progressBarStyles} onClick={props.setPlayPosition}>
                <div className="podcastProgress" style={podcastProgressStyles}></div>
            </div>
            {formatTimeDisplay(props.currentPlaytime)}
        </div>
    );
};

export default PlayerUI;