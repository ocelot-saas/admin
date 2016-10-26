import Auth0 from 'auth0-js';
import Auth0Lock from 'auth0-lock';
import $ from 'jquery';

import { APP_COLORS} from './../common/constants';


export class Auth0Widget {

    constructor(clientId, domain) {
	this.lock = new Auth0Lock(clientId, domain,  {
            closable: false,
            theme: {
                logo: '/img/logo-single.png',
                primaryColor: APP_COLORS['primary']
            },
            languageDictionary: {
                title: 'Ocelot',
            }
        });

        this.lock.on('authorization_error', this._authorizationError.bind(this));
        this.lock.on('unrecoverable_error', this._unrecoverableError.bind(this));
    }

    showLoginWidget() {
	this.lock.show();
    }

    // TODO(horia141): better error handling
    _authorizationError(error) {
	console.log('Authentication Error', error);
    }

    // TODO(horia141): better error handling    
    _unrecoverableError(error) {
	console.log('Unrecoverable Error', error);
    }
}


export class IdentityService {
    
    constructor(clientId, domain, identityServiceDomain) {
        const auth0 = new Auth0({clientID: clientId, domain: domain});

        const authResult = auth0.parseHash(window.location.hash);

	var accessToken = null;

        if (authResult && authResult.accessToken && authResult.idToken) {
	    accessToken = authResult.accessToken;
            this._setAccessToken(authResult.accessToken);
        } else {
	    accessToken = this.getAccessToken();
	}
	    
	this._accessToken = accessToken; // Might be null!
        this._identityServiceDomain = identityServiceDomain
    }

    loggedIn() {
        const token = this.getAccessToken()
        return !!token;
    }

    getUserFromService() {
        const accessToken = this._accessToken;
        return new Promise(
            (resolve, reject) => {
		if (accessToken == null) {
		    reject(401);
		    return;
		}
		
                $.get({
                    url: `http://${this._identityServiceDomain}/user`,
                    dataType: 'json',
                    headers: {'Authorization': `Bearer ${accessToken}`}
                }).done((userResponse) => {
                    resolve({accessToken: accessToken, user: userResponse.user});
                }).fail((xhr) => {
                    if (xhr.status == 404) {
                        $.post({
                            url: `http://${this._identityServiceDomain}/user`,
                            dataType: 'json',
                            headers: {'Authorization': `Bearer ${accessToken}`}
                        }).done((userResponse) => {
                            resolve({accessToken: accessToken, user: userResponse.user});
                        }).fail(() => {
                            reject(xhr.status);
                        })
                    } else {
                        reject(xhr.status);
                    }
                });
            });
    }

    logout() {
        localStorage.removeItem('access_token');
    }

    _setAccessToken(accessToken) {
        localStorage.setItem('access_token', accessToken)
    }

    getAccessToken() {
        return localStorage.getItem('access_token')
    }
}
