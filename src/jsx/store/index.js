import { createStore, combineReducers } from 'redux';


export const OPSTATE_INIT = 'INIT';
export const OPSTATE_READY = 'READY';
export const OPSTATE_LOADING = 'LOADING';
export const OPSTATE_FAILED = 'FAILED';


const GLOBAL_LOADING_READY = 'GLOBAL_LOADING_READY';
const GLOBAL_LOADING_LOADING = 'GLOBAL_LOADING_LOADING';
const GLOBAL_LOADING_FAILED = 'GLOBAL_LOADING_FAILED';
const IDENTITY_GET_USER = 'IDENTITY_GET_USER';
const IDENTITY_LOGOUT = 'IDENTITY_LOGOUT';


export function globalLoadingReady() {
    return {type: GLOBAL_LOADING_READY};
}


export function globalLoadingLoading() {
    return {type: GLOBAL_LOADING_LOADING};
}


export function globalLoadingFailed(errorMessage) {
    return {
        type: GLOBAL_LOADING_FAILED,
        errorMessage: errorMessage
    };
}


export function identityGetUser(accessToken, user) {
    return {
        type: IDENTITY_GET_USER,
        accessToken: accessToken,
        user: user
    };
}


export function identityLogout() {
    return {type: IDENTITY_LOGOUT};
}


const globalLoadingInitialState = {
    opState: OPSTATE_INIT,
    errorMessage: null
};


function globalLoadingReducer(state = globalLoadingInitialState, action) {
    switch (action.type) {
    case GLOBAL_LOADING_READY:
        return {
            opState: OPSTATE_READY,
            errorMessage: null
        };
    case GLOBAL_LOADING_LOADING:
        return {
            opState: OPSTATE_LOADING,
            errorMessage: null
        };
    case GLOBAL_LOADING_FAILED:
        return {
            opState : OPSTATE_FAILED,
            errorMessage: action.errorMessage
        };
    }

    return state;
}


const identityInitialState = {
    accessToken: null,
    user: null
};


function identityReducer(state = identityInitialState, action) {
    switch (action.type) {
    case IDENTITY_GET_USER:
        return {
            accessToken: action.accessToken,
            user: action.user
        };
    case IDENTITY_LOGOUT:
        return {
            accessToken: null,
            user: null
        };
    }

    return state;
}


const reducers = combineReducers({
    globalLoading: globalLoadingReducer,
    identity: identityReducer
});


export const store = createStore(reducers);
