import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function playerReducer(state = initialState.podcastObject, action) {
    switch (action.type) {
        case types.UPDATE_CURRENT_PODCAST:
            return action.podcastObject;

        default:
            return state;
    }
}