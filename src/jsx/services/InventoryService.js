export class InventoryService {

    constructor(inventoryServiceDomain, identityService) {
        this._inventoryServiceDomain = inventoryServiceDomain;
        this._identityService = identityService;
    }

    getOrgFromService() {
        var accessToken = this._identityService.getAccessToken();
        return new Promise(
            (resolve, reject) => {
                $.get({
                    url: `http://${this._inventoryServiceDomain}/org`,
                    dataType: 'json',
                    headers: {'Authorization': `Bearer ${accessToken}`}
                }).done((orgResponse) => {
                    resolve(orgResponse.org);
                }).fail((xhr) => {
                    reject(xhr.status);
                });
            }
        );
    }

    createOrgOnService(orgCreationRequest) {
        var accessToken = this._identityService.getAccessToken();
        return new Promise(
            (resolve, reject) => {
                $.post({
                    url: `http://${this._inventoryServiceDomain}/org`,
                    dataType: 'json',
                    data: JSON.stringify(orgCreationRequest),
                    contentType: 'application/json',
                    headers: {'Authorization': `Bearer ${accessToken}`}
                }).done((orgResponse) => {
                    resolve(orgResponse.org);
                }).fail((xhr) => {
                    reject(xhr.status);
                });
            }
        );
    }

    getRestaurantFromService() {
	var accessToken = this._identityService.getAccessToken();
	return new Promise(
	    (resolve, reject) => {
		$.get({
		    url: `http://${this._inventoryServiceDomain}/org/restaurant`,
		    dataType: 'json',
                    headers: {'Authorization': `Bearer ${accessToken}`}
                }).done((restaurantResponse) => {
                    resolve(restaurantResponse.restaurant);
                }).fail((xhr) => {
                    reject(xhr.status);
                });
            }
        );
    }

    updateRestaurantFromService(updateRestaurantRequest) {
        var accessToken = this._identityService.getAccessToken();
        return new Promise(
            (resolve, reject) => {
                $.ajax({
                    type: 'PUT',
                    url: `http://${this._inventoryServiceDomain}/org/restaurant`,
                    dataType: 'json',
                    data: JSON.stringify(updateRestaurantRequest),
                    contentType: 'application/json',
                    headers: {'Authorization': `Bearer ${accessToken}`}
                }).done((restaurantResponse) => {
                    resolve(restaurantResponse.restaurant);
                }).fail((xhr) => {
                    reject(xhr.status);
                });
            }
        );
    }

    createMenuSection(createMenuSectionRequest) {
        var accessToken = this._identityService.getAccessToken();
        return new Promise(
            (resolve, reject) => {
                $.post({
                    url: `http://${this._inventoryServiceDomain}/org/menu/sections`,
                    dataType: 'json',
                    data: JSON.stringify(createMenuSectionRequest),
                    contentType: 'application/json',
                    headers: {'Authorization': `Bearer ${accessToken}`}
                }).done((menuSectionsResponse) => {
                    resolve(menuSectionsResponse.menuSections[0]);
                }).fail((xhr) => {
                    reject(xhr.status);
                });
            }
        );
    }

    getAllMenuSections() {
	var accessToken = this._identityService.getAccessToken();
	return new Promise(
	    (resolve, reject) => {
		$.get({
		    url: `http://${this._inventoryServiceDomain}/org/menu/sections`,
		    dataType: 'json',
                    headers: {'Authorization': `Bearer ${accessToken}`}
                }).done((menuSectionsResponse) => {
                    resolve(menuSectionsResponse.menuSections);
                }).fail((xhr) => {
                    reject(xhr.status);
                });
            }
        );
    }

    getMenuSection(sectionId) {
	var accessToken = this._identityService.getAccessToken();
	return new Promise(
	    (resolve, reject) => {
		$.get({
		    url: `http://${this._inventoryServiceDomain}/org/menu/sections/${sectionId}`,
		    dataType: 'json',
                    headers: {'Authorization': `Bearer ${accessToken}`}
                }).done((menuSectionResponse) => {
                    resolve(menuSectionResponse.menuSection);
                }).fail((xhr) => {
                    reject(xhr.status);
                });
            }
        );
    }

    updateMenuSection(sectionId, updateMenuSectionRequest) {
        var accessToken = this._identityService.getAccessToken();
        return new Promise(
            (resolve, reject) => {
                $.ajax({
                    type: 'PUT',
                    url: `http://${this._inventoryServiceDomain}/org/sections/${sectionId}`,
                    dataType: 'json',
                    data: JSON.stringify(updateMenuSectionRequest),
                    contentType: 'application/json',
                    headers: {'Authorization': `Bearer ${accessToken}`}
                }).done((menuSectionResponse) => {
                    resolve(menuSectionResponse.menuSectionResponse);
                }).fail((xhr) => {
                    reject(xhr.status);
                });
            }
        );
    }

    deleteMenuSection(sectionId) {
        var accessToken = this._identityService.getAccessToken();
        return new Promise(
            (resolve, reject) => {
                $.ajax({
                    type: 'DELETE',
                    url: `http://${this._inventoryServiceDomain}/org/sections/${sectionId}`,
                    headers: {'Authorization': `Bearer ${accessToken}`}
                }).done((unused) => {
                    resolve({});
                }).fail((xhr) => {
                    reject(xhr.status);
                });
            }
        );
    }

    createMenuItem(createMenuItemRequest) {
        var accessToken = this._identityService.getAccessToken();
        return new Promise(
            (resolve, reject) => {
                $.post({
                    url: `http://${this._inventoryServiceDomain}/org/menu/items`,
                    dataType: 'json',
                    data: JSON.stringify(createMenuItemRequest),
                    contentType: 'application/json',
                    headers: {'Authorization': `Bearer ${accessToken}`}
                }).done((menuItemsResponse) => {
                    resolve(menuItemsResponse.menuItems[0]);
                }).fail((xhr) => {
                    reject(xhr.status);
                });
            }
        );
    }

    getAllMenuItems() {
	var accessToken = this._identityService.getAccessToken();
	return new Promise(
	    (resolve, reject) => {
		$.get({
		    url: `http://${this._inventoryServiceDomain}/org/menu/items`,
		    dataType: 'json',
                    headers: {'Authorization': `Bearer ${accessToken}`}
                }).done((menuItemsResponse) => {
                    resolve(menuItemsResponse.menuItems);
                }).fail((xhr) => {
                    reject(xhr.status);
                });
            }
        );	
    }

    getMenuItem(itemId) {
	var accessToken = this._identityService.getAccessToken();
	return new Promise(
	    (resolve, reject) => {
		$.get({
		    url: `http://${this._inventoryServiceDomain}/org/menu/items/${itemId}`,
		    dataType: 'json',
                    headers: {'Authorization': `Bearer ${accessToken}`}
                }).done((menuItemResponse) => {
                    resolve(menuItemResponse.menuItem);
                }).fail((xhr) => {
                    reject(xhr.status);
                });
            }
        );
    }

    updateMenuItem(itemId, updateMenuItemRequest) {
        var accessToken = this._identityService.getAccessToken();
        return new Promise(
            (resolve, reject) => {
                $.ajax({
                    type: 'PUT',
                    url: `http://${this._inventoryServiceDomain}/org/items/${itemId}`,
                    dataType: 'json',
                    data: JSON.stringify(updateMenuItemRequest),
                    contentType: 'application/json',
                    headers: {'Authorization': `Bearer ${accessToken}`}
                }).done((menuItemResponse) => {
                    resolve(menuItemResponse.menuItemResponse);
                }).fail((xhr) => {
                    reject(xhr.status);
                });
            }
        );
    }

    deleteMenuItem(itemId) {
        var accessToken = this._identityService.getAccessToken();
        return new Promise(
            (resolve, reject) => {
                $.ajax({
                    type: 'DELETE',
                    url: `http://${this._inventoryServiceDomain}/org/items/${itemId}`,
                    headers: {'Authorization': `Bearer ${accessToken}`}
                }).done((unused) => {
                    resolve({});
                }).fail((xhr) => {
                    reject(xhr.status);
                });
            }
        );
    }

    getPlatformsWebsiteFromService() {
	var accessToken = this._identityService.getAccessToken();
	return new Promise(
	    (resolve, reject) => {
		$.get({
		    url: `http://${this._inventoryServiceDomain}/org/platforms/website`,
		    dataType: 'json',
                    headers: {'Authorization': `Bearer ${accessToken}`}
                }).done((platformsWebsiteResponse) => {
                    resolve(platformsWebsiteResponse.platformsWebsite);
                }).fail((xhr) => {
                    reject(xhr.status);
                });
            }
        );
    }

    updatePlatformsWebsiteFromService(updatePlatformsWebsiteRequest) {
        var accessToken = this._identityService.getAccessToken();
        return new Promise(
            (resolve, reject) => {
                $.ajax({
                    type: 'PUT',
                    url: `http://${this._inventoryServiceDomain}/org/platforms/website`,
                    dataType: 'json',
                    data: JSON.stringify(updatePlatformsWebsiteRequest),
                    contentType: 'application/json',
                    headers: {'Authorization': `Bearer ${accessToken}`}
                }).done((platformsWebsiteResponse) => {
                    resolve(platformsWebsiteResponse.platformsWebsite);
                }).fail((xhr) => {
                    reject(xhr.status);
                });
            }
        );
    }

    getPlatformsCallcenterFromService() {
	var accessToken = this._identityService.getAccessToken();
	return new Promise(
	    (resolve, reject) => {
		$.get({
		    url: `http://${this._inventoryServiceDomain}/org/platforms/callcenter`,
		    dataType: 'json',
                    headers: {'Authorization': `Bearer ${accessToken}`}
                }).done((platformsCallcenterResponse) => {
                    resolve(platformsCallcenterResponse.platformsCallcenter);
                }).fail((xhr) => {
                    reject(xhr.status);
                });
            }
        );
    }

    updatePlatformsCallcenterFromService(updatePlatformsCallcenterRequest) {
        var accessToken = this._identityService.getAccessToken();
        return new Promise(
            (resolve, reject) => {
                $.ajax({
                    type: 'PUT',
                    url: `http://${this._inventoryServiceDomain}/org/platforms/callcenter`,
                    dataType: 'json',
                    data: JSON.stringify(updatePlatformsCallcenterRequest),
                    contentType: 'application/json',
                    headers: {'Authorization': `Bearer ${accessToken}`}
                }).done((platformsCallcenterResponse) => {
                    resolve(platformsCallcenterResponse.platformsCallcenter);
                }).fail((xhr) => {
                    reject(xhr.status);
                });
            }
        );
    }

    getPlatformsEmailcenterFromService() {
	var accessToken = this._identityService.getAccessToken();
	return new Promise(
	    (resolve, reject) => {
		$.get({
		    url: `http://${this._inventoryServiceDomain}/org/platforms/emailcenter`,
		    dataType: 'json',
                    headers: {'Authorization': `Bearer ${accessToken}`}
                }).done((platformsEmailcenterResponse) => {
                    resolve(platformsEmailcenterResponse.platformsEmailcenter);
                }).fail((xhr) => {
                    reject(xhr.status);
                });
            }
        );
    }

    updatePlatformsEmailcenterFromService(updatePlatformsEmailcenterRequest) {
        var accessToken = this._identityService.getAccessToken();
        return new Promise(
            (resolve, reject) => {
                $.ajax({
                    type: 'PUT',
                    url: `http://${this._inventoryServiceDomain}/org/platforms/emailcenter`,
                    dataType: 'json',
                    data: JSON.stringify(updatePlatformsEmailcenterRequest),
                    contentType: 'application/json',
                    headers: {'Authorization': `Bearer ${accessToken}`}
                }).done((platformsEmailcenterResponse) => {
                    resolve(platformsEmailcenterResponse.platformsEmailcenter);
                }).fail((xhr) => {
                    reject(xhr.status);
                });
            }
        );
    }
}
