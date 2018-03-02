import React, { Component } from 'react';
import SearchBar from './SearchBar';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as searchActions from '../../actions/searchActions';
import PropTypes from 'prop-types';

class SearchContainerPage extends Component {
    constructor(props) {
        super(props);
        //include this incase search event is triggered with empty search
        this.state = {
            searchQuery: ''
        }

        this.clearSearchQuery = this.clearSearchQuery.bind(this);
        this.updateSearchValue = this.updateSearchValue.bind(this);
        this.searchAPIForPodcast = this.searchAPIForPodcast.bind(this);
        this.debugState = this.debugState.bind(this);
    }

    clearSearchQuery(event) {
        event.preventDefault();

        this.setState({
            searchQuery: ''
        })
    }

    updateSearchValue(event) {
        const value = event.target.value;
        return this.setState({ searchQuery: value });
    }

    searchAPIForPodcast(event) {
        event.preventDefault();
        //the itunes api expects spaces to be encoded with "+"
        //consider doing this in the backend
        const encodedQuery = encodeURIComponent(this.state.searchQuery).replace(/%20/g, "+");
        this.props.actions.startPodcastSearch(encodedQuery);
        //switch the route to the search result page
        this.props.history.push('/search?qs=' + encodedQuery);
    }

    debugState(event) {
        event.preventDefault();
        console.log(this.props.channel.channel);
    }

    render() {
        return (
            <header className="search-area">
                <SearchBar
                    handleChange={this.updateSearchValue}
                    handleSubmit={this.searchAPIForPodcast}
                    />
            </header>
        );
    }
}

SearchContainerPage.propTypes = {
    search: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
    return {
        search: state.search,
        channel: state.channel
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(searchActions, dispatch)
    }
}

//using the withRouter HoC for redirects to search page
//using the connect HoC to redux state
//looks ugly, but works
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchContainerPage));