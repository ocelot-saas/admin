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


export const menuSectionsLoading = createAction('MENU_SECTIONS_LOADING');
export const menuSectionsReady = createAction('MENU_SECTIONS_READY', (menuSections) => { return { menuSections }; });
export const menuSectionsFailed = createAction('MENU_SECTIONS_LOADING');
export const menuSectionsClear = createAction('MENU_SECTIONS_CLEAR');


const menuSectionsInitialState = {
    opState: OPSTATE_INIT,
    errorMessage: null,
    menuSections: null
};


function menuSections(state = menuSectionsInitialState, action) {
    switch (action.type) {
    case 'MENU_SECTIONS_LOADING':
	return {
	    opState: OPSTATE_LOADING,
	    errorMessage: null,
	    menuSections: null
	};
    case 'MENU_SECTIONS_READY':
	return {
	    opState: OPSTATE_READY,
	    errorMessage: null,
	    menuSections: action.payload.menuSections
	};
    case 'MENU_SECTIONS_FAILED':
	return {
	    opState: OPSTATE_FAILED,
	    errorMessage: action.payload.message,
	    menuSections: null
	};
    case 'MENU_SECTIONS_CLEAR':
	return {
	    opState: OPSTATE_INIT,
	    errorMessage: null,
	    menuSections: null
	};
    default:
	return state;
    }
}


export const currentMenuSectionLoading = createAction('CURRENT_MENU_SECTION_LOADING');
export const currentMenuSectionReady = createAction('CURRENT_MENU_SECTION_READY', (currentMenuSection) => { return { currentMenuSection }; });
export const currentMenuSectionFailed = createAction('CURRENT_MENU_SECTION_LOADING');
export const currentMenuSectionClear = createAction('CURRENT_MENU_SECTION_CLEAR');


const currentMenuSectionInitialState = {
    opState: OPSTATE_INIT,
    errorMessage: null,
    currentMenuSection: null
};


function currentMenuSection(state = currentMenuSectionInitialState, action) {
    switch (action.type) {
    case 'CURRENT_MENU_SECTION_LOADING':
	return {
	    opState: OPSTATE_LOADING,
	    errorMessage: null,
	    currentMenuSection: null
	};
    case 'CURRENT_MENU_SECTION_READY':
	return {
	    opState: OPSTATE_READY,
	    errorMessage: null,
	    currentMenuSection: action.payload.currentMenuSection
	};
    case 'CURRENT_MENU_SECTION_FAILED':
	return {
	    opState: OPSTATE_FAILED,
	    errorMessage: action.payload.message,
	    currentMenuSection: null
	};
    case 'CURRENT_MENU_SECTION_CLEAR':
	return {
	    opState: OPSTATE_INIT,
	    errorMessage: null,
	    currentMenuSection: null
	};
    default:
	return state;
    }
}


export const menuItemsLoading = createAction('MENU_ITEMS_LOADING');
export const menuItemsReady = createAction('MENU_ITEMS_READY', (menuItems) => { return { menuItems }; });
export const menuItemsFailed = createAction('MENU_ITEMS_LOADING');
export const menuItemsClear = createAction('MENU_ITEMS_CLEAR');


const menuItemsInitialState = {
    opState: OPSTATE_INIT,
    errorMessage: null,
    menuItems: null
};


function menuItems(state = menuItemsInitialState, action) {
    switch (action.type) {
    case 'MENU_ITEMS_LOADING':
	return {
	    opState: OPSTATE_LOADING,
	    errorMessage: null,
	    menuItems: null
	};
    case 'MENU_ITEMS_READY':
	return {
	    opState: OPSTATE_READY,
	    errorMessage: null,
	    menuItems: action.payload.menuItems
	};
    case 'MENU_ITEMS_FAILED':
	return {
	    opState: OPSTATE_FAILED,
	    errorMessage: action.payload.message,
	    menuItems: null
	};
    case 'MENU_ITEMS_CLEAR':
	return {
	    opState: OPSTATE_INIT,
	    errorMessage: null,
	    menuItems: null
	};
    default:
	return state;
    }
}


export const currentMenuItemLoading = createAction('CURRENT_MENU_ITEM_LOADING');
export const currentMenuItemReady = createAction('CURRENT_MENU_ITEM_READY', (currentMenuItem) => { return { currentMenuItem }; });
export const currentMenuItemFailed = createAction('CURRENT_MENU_ITEM_LOADING');
export const currentMenuItemClear = createAction('CURRENT_MENU_ITEM_CLEAR');


const currentMenuItemInitialState = {
    opState: OPSTATE_INIT,
    errorMessage: null,
    currentMenuItem: null
};


function currentMenuItem(state = currentMenuItemInitialState, action) {
    switch (action.type) {
    case 'CURRENT_MENU_ITEM_LOADING':
	return {
	    opState: OPSTATE_LOADING,
	    errorMessage: null,
	    currentMenuItem: null
	};
    case 'CURRENT_MENU_ITEM_READY':
	return {
	    opState: OPSTATE_READY,
	    errorMessage: null,
	    currentMenuItem: action.payload.currentMenuItem
	};
    case 'CURRENT_MENU_ITEM_FAILED':
	return {
	    opState: OPSTATE_FAILED,
	    errorMessage: action.payload.message,
	    currentMenuItem: null
	};
    case 'CURRENT_MENU_ITEM_CLEAR':
	return {
	    opState: OPSTATE_INIT,
	    errorMessage: null,
	    currentMenuItem: null
	};
    default:
	return state;
    }
}


export const platformsWebsiteLoading = createAction('PLATFORMS_WEBSITE_LOADING');
export const platformsWebsiteReady = createAction('PLATFORMS_WEBSITE_READY', (platformsWebsite) => { return { platformsWebsite }; });
export const platformsWebsiteFailed = createAction('PLATFORMS_WEBSITE_FAILED');


const platformsWebsiteInitialState = {
    opState: OPSTATE_INIT,
    errorMessage: null,
    platformsWebsite: null
};


function platformsWebsite(state = platformsWebsiteInitialState, action) {
    switch (action.type) {
    case 'PLATFORMS_WEBSITE_LOADING':
	return {
	    opState: OPSTATE_LOADING,
	    errorMessage: null,
	    platformsWebsite: null
	};
    case 'PLATFORMS_WEBSITE_READY':
        return {
            opState: OPSTATE_READY,
            errorMessage: null,
            platformsWebsite: action.payload.platformsWebsite
        };
    case 'PLATFORMS_WEBSITE_FAILED':
	return {
	    opState: OPSTATE_FAILED,
	    errorMessage: action.payload.message,
	    platformsWebsite: null
	};
    default:
	return state;
    }
}


export const platformsCallcenterLoading = createAction('PLATFORMS_CALLCENTER_LOADING');
export const platformsCallcenterReady = createAction('PLATFORMS_CALLCENTER_READY', (platformsCallcenter) => { return { platformsCallcenter }; });
export const platformsCallcenterFailed = createAction('PLATFORMS_CALLCENTER_FAILED');


const platformsCallcenterInitialState = {
    opState: OPSTATE_INIT,
    errorMessage: null,
    platformsCallcenter: null
};


function platformsCallcenter(state = platformsCallcenterInitialState, action) {
    switch (action.type) {
    case 'PLATFORMS_CALLCENTER_LOADING':
	return {
	    opState: OPSTATE_LOADING,
	    errorMessage: null,
	    platformsCallcenter: null
	};
    case 'PLATFORMS_CALLCENTER_READY':
        return {
            opState: OPSTATE_READY,
            errorMessage: null,
            platformsCallcenter: action.payload.platformsCallcenter
        };
    case 'PLATFORMS_CALLCENTER_FAILED':
	return {
	    opState: OPSTATE_FAILED,
	    errorMessage: action.payload.message,
	    platformsCallcenter: null
	};
    default:
	return state;
    }
}


export const platformsEmailcenterLoading = createAction('PLATFORMS_EMAILCENTER_LOADING');
export const platformsEmailcenterReady = createAction('PLATFORMS_EMAILCENTER_READY', (platformsEmailcenter) => { return { platformsEmailcenter }; });
export const platformsEmailcenterFailed = createAction('PLATFORMS_EMAILCENTER_FAILED');


const platformsEmailcenterInitialState = {
    opState: OPSTATE_INIT,
    errorMessage: null,
    platformsEmailcenter: null
};


function platformsEmailcenter(state = platformsEmailcenterInitialState, action) {
    switch (action.type) {
    case 'PLATFORMS_EMAILCENTER_LOADING':
	return {
	    opState: OPSTATE_LOADING,
	    errorMessage: null,
	    platformsEmailcenter: null
	};
    case 'PLATFORMS_EMAILCENTER_READY':
        return {
            opState: OPSTATE_READY,
            errorMessage: null,
            platformsEmailcenter: action.payload.platformsEmailcenter
        };
    case 'PLATFORMS_EMAILCENTER_FAILED':
	return {
	    opState: OPSTATE_FAILED,
	    errorMessage: action.payload.message,
	    platformsEmailcenter: null
	};
    default:
	return state;
    }
}


const reducers = combineReducers({
    identity: identity,
    org: org,
    restaurant: restaurant,
    menuSections: menuSections,
    currentMenuSection: currentMenuSection,
    menuItems: menuItems,
    currentMenuItem: currentMenuItem,
    platformsWebsite: platformsWebsite,
    platformsCallcenter: platformsCallcenter,
    platformsEmailcenter: platformsEmailcenter
});


export const store = createStore(reducers);
