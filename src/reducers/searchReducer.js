import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function searchReducer(state = initialState.search, action) {
    switch (action.type) {
        case types.ITUNES_SEARCH_SUCCESS:
            return action.results;

        default:
            return state;
    }
}