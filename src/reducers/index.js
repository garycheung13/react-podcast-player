import {combineReducers} from 'redux';
import playlist from './playlistReducer';
import search from './searchReducer';
import queue from './queueReducer';
import player from './playerReducer';
import channel from './channelReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

/* this slices up the state */
const rootReducer = combineReducers({
    playlist,
    search,
    queue,
    player,
    channel,
    ajaxCallsInProgress
});

export default rootReducer;