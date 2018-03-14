import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function playerReducer(state = initialState.podcastObject, action) {
    switch (action.type) {
        case types.UPDATE_CURRENT_PODCAST:
            // refer to second answer for reminder of this syntax
            // https://stackoverflow.com/questions/34698905/clone-a-js-object-except-for-one-key
            return Object.assign({}, state, action.podcastObject);

        default:
            return state;
    }
}