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
            opState: OPSTATE_READY,
            errorMessage: null,
            accessToken: null,
            user: null
        };
    default:
        return state;
    }
}


export const orgLoading = createAction('ORG_LOADING');
export const orgReady = createAction('ORG_READY', (org) => { return { org }; });
export const orgFailed = createAction('ORG_FAILED');
export const orgClear = createAction('ORG_CLEAR');


const orgInitialState = {
    opState: OPSTATE_INIT,
    errorMessage: null,
    org: null
};


function org(state = orgInitialState, action) {
    switch (action.type) {
    case 'ORG_LOADING':
	return {
	    opState: OPSTATE_LOADING,
	    errorMessage: null,
	    org: null
	};
    case 'ORG_READY':
	return {
	    opState: OPSTATE_READY,
	    errorMessage: null,
	    org: action.payload.org
	};
    case 'ORG_FAILED':
	return {
	    opState: OPSTATE_FAILED,
	    errorMessage: action.payload.message,
	    org: null
	};
    case 'ORG_CLEAR':
	return {
	    opState: OPSTATE_READY,
	    errorMessage: null,
	    org: null
	};
    default:
	return state;
    }
}


export const restaurantLoading = createAction('RESTAURANT_LOADING');
export const restaurantReady = createAction('RESTAURANT_READY', (restaurant) => { return { restaurant }; });
export const restaurantFailed = createAction('RESTAURANT_FAILED');


const restaurantInitialState = {
    opState: OPSTATE_INIT,
    errorMessage: null,
    restaurant: null
};


function restaurant(state = restaurantInitialState, action) {
    switch (action.type) {
    case 'RESTAURANT_LOADING':
	return {
	    opState: OPSTATE_LOADING,
	    errorMessage: null,
	    restaurant: null
	};
    case 'RESTAURANT_READY':
        return {
            opState: OPSTATE_READY,
            errorMessage: null,
            restaurant: action.payload.restaurant
        };
    case 'RESTAURANT_FAILED':
	return {
	    opState: OPSTATE_FAILED,
	    errorMessage: action.payload.message,
	    restaurant: null
	};
    default:
	return state;
    }
}


const reducers = combineReducers({
    identity: identity,
    org: org,
    restaurant: restaurant
});


export const store = createStore(reducers);
