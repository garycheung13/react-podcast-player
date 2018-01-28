import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function playlistReducer(state=initialState.playlist, action) {
    switch (action.type) {
        case types.LOAD_PLAYLIST_SUCCESS:
            return action.playlist;

        default:
            return state;
    }
}