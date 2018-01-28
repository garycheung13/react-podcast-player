import React, { Component } from 'react';
// import { Howler, Howl } from 'howler';
import {connect} from 'react-redux';

class PlayerContainerPage extends Component {
    logProps() {
        console.log(this.props.playlist);
    }

    render() {
        return (
            <div>
                {this.logProps()}
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
      playlist: state.playlist
    }
  }

export default connect(mapStateToProps)(PlayerContainerPage);