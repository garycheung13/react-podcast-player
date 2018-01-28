import React, { Component } from 'react';
import { Howler, Howl } from 'howler';
import PlayerUI from './PlayerUI';
import PlayerPlaylist from './PlayerPlaylist';

class PlayerContainerPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlist: [{
                id: 0,
                title: "Zardulu",
                url: "http://dcs.megaphone.fm/GLT8731349509.mp3?key=2e2b8bb887fc22452512ebbc61add357",
                howl: null
            },
            {
                id: 1,
                title: "Influencers 1",
                url: "https://www.podtrac.com/pts/redirect.mp3/traffic.libsyn.com/secure/thetruthapm/Influencers_part_1.mp3?dest-id=90480",
                howl: null
            }],
            currentPlayingPodcast: null,
            currentPlaytime: 0,
            duration: 0,
            isPlayerActive: false
        };
        this.createHowl = this.createHowl.bind(this);
        this.playPodcast = this.playPodcast.bind(this);
        this.pausePodcast = this.pausePodcast.bind(this);
        this.countOneSecond = this.countOneSecond.bind(this);
        this.switchPodcast = this.switchPodcast.bind(this);
        this.loadEpisodeByPlaylistRow = this.loadEpisodeByPlaylistRow.bind(this);
        this.setPlayPosition = this.setPlayPosition.bind(this);
    }
    /* howler counts in seconds */
    countOneSecond() {
        this.setState({
            currentPlaytime: this.state.currentPlaytime + 1
        });
    }

    createHowl(url) {
        return new Howl({
            src: [url],
            html5: true,
            onplay: () => {
                this.setState({
                    duration: this.state.currentPlayingPodcast.howl.duration()
                });
                this.playtime = setInterval(this.countOneSecond, 1000);
            },
            onpause: () => {
                clearInterval(this.playtime);
            },

            onseek: () => {
                /* when seek is called without a value, it returns the current play position */
                this.setState({
                    currentPlaytime: Math.round(this.state.currentPlayingPodcast.howl.seek())
                });
            },

            onstop: () => {
                clearInterval(this.playtime);
                this.setState({
                    isPlayerActive: false
                });
            }
        });
    }

    setVolume(volumeNum) {
        Howler.volume(volumeNum);
    }

    setPlayPosition(event) {
        event.preventDefault();
        const clickPosition = event.clientX;
        const newPostion = (clickPosition * this.state.duration) / event.currentTarget.offsetWidth;
        this.state.currentPlayingPodcast.howl.seek(newPostion);
    }

    loadEpisodeByPlaylistRow(episode) {
        let episodeRow = episode;
        let _this = this;

        return function (event) {
            event.preventDefault();
            /* there is something playing, stop it */
            if (_this.state.currentPlayingPodcast) {
                _this.state.currentPlayingPodcast.howl.stop();
                _this.setState({
                    isPlayerActive: false
                });
            }
            _this.switchPodcast(episodeRow.id);
        }
    }

    switchPodcast(index) {
        let podcastSelection = this.state.playlist[index];
        /* if the playlist item already has a howl created, use it */
        /* TODO make this DRY */
        if (podcastSelection.howl) {
            this.setState({
                currentPlaytime: 0,
                currentPlayingPodcast: podcastSelection
            });
        } else {
            podcastSelection.howl = this.createHowl(podcastSelection.url)
            this.setState({
                currentPlaytime: 0,
                currentPlayingPodcast: podcastSelection
            });
        }
    }

    playPodcast() {
        this.state.currentPlayingPodcast.howl.play();
        this.setState({
            isPlayerActive: true
        });
    }

    pausePodcast() {
        this.state.currentPlayingPodcast.howl.pause();
        this.setState({
            isPlayerActive: false
        });
    }


    render() {
        return (
            <div>
                <PlayerPlaylist playlist={this.state.playlist} bindEpisode={this.loadEpisodeByPlaylistRow} />
                <PlayerUI
                    playFunc={this.playPodcast}
                    pauseFunc={this.pausePodcast}
                    currentPlaytime={this.state.currentPlaytime}
                    duration={this.state.duration}
                    currentPodcast={this.state.currentPlayingPodcast}
                    playtime={this.state.currentPlaytime}
                    playerIsActive={this.state.isPlayerActive}
                    switchPodcast={this.switchPodcast}
                    volumeControl={this.setVolume}
                    setPlayPosition={this.setPlayPosition}
                />
            </div>
        );
    }
}

export default PlayerContainerPage;