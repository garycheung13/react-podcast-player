import * as types from './actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxCallActions';

export function podcastSearchSuccess(results) {
    return {type: types.ITUNES_SEARCH_SUCCESS, results};
}

function fetchSearchResults(queryString) {
    return fetch('api/itunes/' + queryString);
}

export function startPodcastSearch(queryString) {
    return function (dispatch) {
        dispatch(beginAjaxCall());
        return fetchSearchResults(queryString)
            .then(res => res.json())
            .then(result => {
                dispatch(podcastSearchSuccess(result));
            }).catch(error => {
                dispatch(ajaxCallError(error));
                throw(error);
            });
    };
}