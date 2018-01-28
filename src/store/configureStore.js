import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers/index';
import initalState from '../reducers/initialState';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

function configureStoreProd(initialState){
    const middlewares = [thunk];
    return createStore(
        rootReducer,
        initalState,
        applyMiddleware(...middlewares)
    );
}

function configureStoreDev(initalState){
    const middlewares = [
        reduxImmutableStateInvariant(),
        thunk
    ];
    return createStore(
        rootReducer,
        initalState,
        applyMiddleware(...middlewares)
    );
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configureStore;