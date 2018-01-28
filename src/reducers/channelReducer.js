import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function searchReducer(state = initialState.channel, action) {
    switch (action.type) {
        case types.GET_CHANNEL_SUCCESS:
            return action.channel;

        default:
            return state;
    }
}