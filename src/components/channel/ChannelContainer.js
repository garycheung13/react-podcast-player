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
    constructor(props) {
        super(props);
        this.state = {
            pager: {
                firstIndex: 0,
                lastIndex: 0,
                totalItems: 1,
                totalPages: 0,
                page: 0
            },
            itemsInView: []
        }
        this.setPage = this.setPage.bind(this);
        this.updatePager = this.updatePager.bind(this);
    }

    setPage(page = 1) {
        let pager = this.state.pager;
        const items = this.props.channel.item;
        pager = this.updatePager(items.length, page);

        const itemsInView = items.slice(pager.firstIndex, pager.lastIndex + 1);

        this.setState({
            pager: pager,
            itemsInView: itemsInView
        })
    }

    // returns a pager object
    updatePager(totalItems, currentPage = 1, itemsPerPage = 10) {
        const totalPages = Math.ceil(totalItems/itemsPerPage);
        const firstIndex = (currentPage - 1) * itemsPerPage;
        const lastIndex = Math.min(firstIndex + itemsPerPage - 1, totalItems - 1);

        return {
            page: currentPage,
            totalPages: totalPages,
            firstIndex: firstIndex,
            lastIndex: lastIndex,
            totalItems: totalItems,
        }
    }

    // grab the link and channel id so the child components can use them for error handling
    componentWillMount() {
        const feedUrl = this.props.location.search;
        this.channelData = queryString.parse(feedUrl);
        this.props.actions.channelActions.startChannelFetch(encodeURIComponent(this.channelData.name));
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.channel !== prevProps.channel) {
            this.setPage(); // creating the pager
        }
    }

    render() {
        const channel = this.props.channel;
        // console.log(channel);
        if (this.props.ajaxCallsInProgress === 0 && this.state.itemsInView.length) {
            return (
                <div className="channel">
                    <ChannelInformation
                        title={channel.title}
                        author={channel["itunes:author"]}
                        image={channel["itunes:image"].href}
                        id={this.channelData.id}
                    />
                    <div className="channel__episodes">
                        <ChannelSummary
                            summary={channel["description"]}
                        />
                        <ChannelEpisodeList
                            episodeList={this.state.itemsInView}
                            playerActions={this.props.actions.playerActions}
                            player={this.props.player}
                            channelTitle={channel.title}
                            pager={this.state.pager}
                            handlePager={this.setPage}
                        />
                    </div>
                </div>
            );
        } else {
            return (
                <div>Retrieving the podcast feed now...</div>
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
        channel: state.channel.channel,
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