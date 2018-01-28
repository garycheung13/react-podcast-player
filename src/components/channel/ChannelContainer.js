import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as channelActions from '../../actions/channelActions';
import queryString from 'query-string';
import ChannelInformation from './ChannelInformation';

class ChannelContainer extends Component {
    componentDidMount() {
        const feedUrl = this.props.location.search;
        const parsedQuery = queryString.parse(feedUrl);
        this.props.actions.startChannelFetch(encodeURIComponent(parsedQuery.name));
    }

    render() {
        const channelInfo = this.props.channel.channel;
        return (
            <div>
                <ChannelInformation
                    title={channelInfo.title}
                    summary={channelInfo["itunes:summary"]}
                    image={channelInfo["itunes:image"].href}
                />
            </div>
        );
    }
}

ChannelContainer.propTypes = {
    channel: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        channel: state.channel
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(channelActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelContainer);