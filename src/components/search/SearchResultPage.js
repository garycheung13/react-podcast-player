import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SearchResultItem from './SearchResultItem';
import { bindActionCreators } from 'redux';
import * as searchActions from '../../actions/searchActions';
import queryString from 'query-string';

class SearchResultsPage extends Component {
    componentDidMount() {
        //check the link includes a query param
        const searchQuery = this.props.location.search;
        const parsedQuery = queryString.parse(searchQuery);
        //if there is a search query included in the URL, fetch it
        //but only there hasn't been a search made yet
        if (searchQuery && this.props.search.resultCount === -1) {
            this.props.actions.startPodcastSearch(parsedQuery.qs)
        }
    }

    render() {
        const searchResult = this.props.search;
        let display = null;

        //handle conditions where search is performed with an empty input
        if (searchResult.hasOwnProperty("emptySearchError")) {
            display = <p>Please enter the name of podcast you are looking for.</p>;
        } else {
            display = searchResult.results.map((result, index) => <SearchResultItem key={index} result={result} />)
        }

        return (
            <div>
                <h1>Search Results</h1>
                {display}
            </div>
        );
    }
}

SearchResultsPage.propTypes = {
    search: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        search: state.search
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(searchActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsPage);