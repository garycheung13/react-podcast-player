import * as types from './actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxCallActions';

export function loadPlaylistSuccess(playlist) {
    return {type: types.LOAD_PLAYLIST_SUCCESS, playlist};
}

function fetchPlaylist() {
    return fetch('api/demo/playlist');
}

export function loadPlaylist() {
    return function (dispatch) {
        dispatch(beginAjaxCall());
        return fetchPlaylist()
            .then(res => res.json())
            .then(result => {
                dispatch(loadPlaylistSuccess(result));
            }).catch(error => {
                dispatch(ajaxCallError(error));
                throw(error);
            });
    };
}