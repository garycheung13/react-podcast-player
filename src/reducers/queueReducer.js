import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function queueReducer(state = initialState.queue, action) {
    switch (action.type) {
        case types.LOAD_QUEUE_SUCCESS:
            return action.queue;
        default:
            return state;
    }
}
