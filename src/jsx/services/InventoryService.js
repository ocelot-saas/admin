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
