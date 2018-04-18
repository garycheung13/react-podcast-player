import * as types from './actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxCallActions';

export function channelLoadSuccess(channel) {
    return {type: types.GET_CHANNEL_SUCCESS, channel};
}

function fetchChannel(rssUrl) {
    const url = decodeURIComponent(rssUrl);
    return fetch('api/parser/', {
        method: "post",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify({feed: url}),
    });
}

export function startChannelFetch(rssUrl) {
    return function (dispatch) {
        dispatch(beginAjaxCall());
        return fetchChannel(rssUrl)
            .then(res => res.json())
            .then(channel => {
                dispatch(channelLoadSuccess(channel));
            }).catch(error =>{
                dispatch(ajaxCallError(error));
                throw(error);
            })
    };
}