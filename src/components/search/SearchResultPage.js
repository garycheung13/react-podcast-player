import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SearchResultItem from './SearchResultItem';
import { bindActionCreators } from 'redux';
import * as searchActions from '../../actions/searchActions';
import queryString from 'query-string';

class SearchResultsPage extends Component {
    componentWillMount() {
        //check that the link includes a query param
        const searchQuery = this.props.location.search;
        const parsedQuery = queryString.parse(searchQuery);

        // handle cases where the search result url is entered directly
        // rather than from the homepage/channel.
        // if the page mounts without an ajax call, it means url was entered directly
        if (searchQuery && this.props.search.resultCount === -1 && this.props.ajaxCallsInProgress === 0) {
            this.props.actions.startPodcastSearch(parsedQuery.qs)
        }
    }

    render() {
        const search = this.props.search;
        let display = null;

        //handle conditions where search is performed with an empty input
        if (this.props.ajaxCallsInProgress) {
            display = <p>Search in progress</p>
        } else if (search.hasOwnProperty("emptySearchError")) {
            display = <p>Please enter the name of podcast you are looking for.</p>;
        } else if (search.results.length === 0 && this.props.ajaxCallsInProgress === 0) {
            display = <p>No results Found</p>
        } else {
            display = search.results.map((result, index) => <SearchResultItem key={index} result={result} />)
        }

        return (
            <div className="search-results">
                <h1>Search Results</h1>
                <hr />
                <div className="search-results__content">
                    {display}
                </div>
            </div>
        );
    }
}

SearchResultsPage.propTypes = {
    search: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        search: state.search,
        ajaxCallsInProgress: state.ajaxCallsInProgress
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(searchActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsPage);