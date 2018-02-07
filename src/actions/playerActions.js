import * as types from './actionTypes';

export function updateCurrentPodcast(podcastObject) {
    return {type: types.UPDATE_CURRENT_PODCAST, podcastObject}
}