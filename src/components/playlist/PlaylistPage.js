import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as playlistActions from '../../actions/playlistActions';
import PlaylistTable from './PlaylistTable';

class PlaylistPage extends Component {

    componentDidMount() {
        this.props.actions.loadPlaylist();
    }

    render() {
        return (
            <div>
                <PlaylistTable playlist={this.props.playlist} />
            </div>
        );
    }
}

PlaylistPage.propTypes = {
    playlist: PropTypes.array
};

function mapStateToProps(state, ownProps) {
    return {
      playlist: state.playlist
    }
  }

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(playlistActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistPage);