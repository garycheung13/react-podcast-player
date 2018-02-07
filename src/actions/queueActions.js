import * as types from "./actionTypes";
// import {beginAjaxCall, ajaxCallError} from './ajaxCallActions';

export function loadQueueSuccess(queue) {
    return {type: types.LOAD_QUEUE_SUCCESS, queue}
}