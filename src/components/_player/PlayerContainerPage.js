import React, { Component } from 'react';
// import { Howler, Howl } from 'howler';
import {connect} from 'react-redux';

class PlayerContainerPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlayerActive : false
        }
    }

    logProps() {
        console.log(this.props);
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
      playlist: state.playlist,
      queue: state.queue,
      player: state.player
    }
  }

export default connect(mapStateToProps)(PlayerContainerPage);