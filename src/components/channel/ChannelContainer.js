import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as channelActions from '../../actions/channelActions';
import * as playerActions from '../../actions/playerActions';
import { bindActionCreators } from 'redux';
import queryString from 'query-string';
import ChannelInformation from './ChannelInformation';
import ChannelEpisodeList from './ChannelEpisodeList';

class ChannelContainer extends Component {

    // grab the link and channel id so the child components can use them for error handling
    componentWillMount() {
        const feedUrl = this.props.location.search;
        this.channelData = queryString.parse(feedUrl);
        this.props.actions.channelActions.startChannelFetch(encodeURIComponent(this.channelData.name));
    }

    render() {
        const channelInfo = this.props.channel.channel;
        if (this.props.ajaxCallsInProgress) {
            return (
                <div>Still Loading..</div>
            );
        } else {
            return (
                <div>
                    <ChannelInformation
                        title={channelInfo.title}
                        summary={channelInfo["description"]}
                        image={channelInfo["itunes:image"].href}
                        id={this.channelData.id}
                    />
                    <ChannelEpisodeList
                        episodeList={channelInfo.item}
                        playerActions={this.props.actions.playerActions}
                        player={this.props.player}
                    />
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