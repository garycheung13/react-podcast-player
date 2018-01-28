import React, { Component } from 'react';
import PlayerContainerPage from './_player/PlayerContainerPage';
import SearchContainerPage from './search/SearchContainerPage';
import SearchResultPage from './search/SearchResultPage';
import ChannelContainer from './channel/ChannelContainer';
import {Route} from 'react-router-dom';
import PlaylistPage from './playlist/PlaylistPage';
import Header from './common/Header';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <SearchContainerPage />
        <Route path='/playlist' component={PlaylistPage}/>
        <Route exact path='/search' component={SearchResultPage} />
        <Route exact path='/channel' component={ChannelContainer} />

        <PlayerContainerPage />
      </div>
    );
  }
}

export default App;
