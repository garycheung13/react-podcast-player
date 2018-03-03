import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as channelActions from '../../actions/channelActions';
import * as playerActions from '../../actions/playerActions';
import { bindActionCreators } from 'redux';
import queryString from 'query-string';
import ChannelInformation from './ChannelInformation';
import ChannelEpisodeList from './ChannelEpisodeList';
import ChannelSummary from './ChannelSummary';

class ChannelContainer extends Component {

    // grab the link and channel id so the child components can use them for error handling
    componentWillMount() {
        const feedUrl = this.props.location.search;
        this.channelData = queryString.parse(feedUrl);
        this.props.actions.channelActions.startChannelFetch(encodeURIComponent(this.channelData.name));
    }

    render() {
        const channelInfo = this.props.channel.channel;
        console.log(channelInfo);
        if (this.props.ajaxCallsInProgress) {
            return (
                <div>Retrieving the podcast feed now...</div>
            );
        } else {
            return (
                <div className="channel">
                    <ChannelInformation
                        title={channelInfo.title}
                        author={channelInfo["itunes:author"]}
                        image={channelInfo["itunes:image"].href}
                        id={this.channelData.id}
                    />
                    <div className="channel__episodes">
                        <ChannelSummary
                            summary={channelInfo["description"]}
                        />
                        <ChannelEpisodeList
                            episodeList={channelInfo.item}
                            playerActions={this.props.actions.playerActions}
                            player={this.props.player}
                            channelTitle={channelInfo.title}
                        />
                    </div>
                </div>
            );
        }
    }
}

ChannelContainer.propTypes = {
    channel: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        ajaxCallsInProgress: state.ajaxCallsInProgress,
        channel: state.channel,
        player: state.player
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            channelActions: bindActionCreators(channelActions, dispatch),
            playerActions: bindActionCreators(playerActions, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelContainer);