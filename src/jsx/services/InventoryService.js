export default class InventoryService {

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
}
