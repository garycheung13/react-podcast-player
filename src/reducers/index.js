import {combineReducers} from 'redux';
import playlist from './playlistReducer';
import search from './searchReducer';
import channel from './channelReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

/* this slices up the state */
const rootReducer = combineReducers({
    playlist,
    search,
    channel,
    ajaxCallsInProgress
});

export default rootReducer;