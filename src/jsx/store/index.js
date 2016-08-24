import { createStore, combineReducers } from 'redux';
import { createAction } from 'redux-actions';


export const OPSTATE_INIT = 'INIT';
export const OPSTATE_LOADING = 'LOADING';
export const OPSTATE_READY = 'READY';
export const OPSTATE_FAILED = 'FAILED';


export const identityLoading = createAction('IDENTITY_LOADING');
export const identityReady = createAction('IDENTITY_READY', (accessToken, user) => { return { accessToken, user }; });
export const identityFailed = createAction('IDENTITY_FAILED');
export const identityClear = createAction('IDENTITY_CLEAR');


const identityInitialState = {
    opState: OPSTATE_INIT,
    errorMessage: null,
    accessToken: null,
    user: null
};


function identity(state = identityInitialState, action) {
    switch (action.type) {
    case 'IDENTITY_LOADING':
	return {
	    opState: OPSTATE_LOADING,
	    errorMessage: null,
	    accessToken: null,
	    user: null
	};
    case 'IDENTITY_READY':
	return {
	    opState: OPSTATE_READY,
	    errorMessage: null,
	    accessToken: action.payload.accessToken,
	    user: action.payload.user
	};
    case 'IDENTITY_FAILED':
	return {
	    opState: OPSTATE_FAILED,
	    errorMessage: action.payload.message,
	    accessToken: null,
	    user: null
	};
    case 'IDENTITY_CLEAR':
	return {
	    opState: OPSTATE_INIT,
	    errorMessage: null,
	    accessToken: null,
	    user: null
	};
    default:
	return state;
    }
}


const reducers = combineReducers({
    identity: identity
});


export const store = createStore(reducers);

