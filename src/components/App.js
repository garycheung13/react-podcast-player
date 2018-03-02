import React, { Component } from 'react';
import Homepage from './homepage/Homepage';
import PlayerContainerPage from './_player/PlayerContainerPage';
import SearchContainerPage from './search/SearchContainerPage';
import SearchResultPage from './search/SearchResultPage';
import ChannelContainer from './channel/ChannelContainer';
import { Route } from 'react-router-dom';
import PlaylistPage from './playlist/PlaylistPage';

class App extends Component {
  render() {
    return (
      <div>
        <SearchContainerPage />
        <main className='main-area'>
          <Route exact path='/' component={Homepage} />
          <Route path='/playlist' component={PlaylistPage} />
          <Route exact path='/search' component={SearchResultPage} />
          <Route exact path='/channel' component={ChannelContainer} />
        </main>
        <PlayerContainerPage />
      </div>
    );
  }
}

export default App;
