import Auth0 from 'auth0-js'
import Auth0Lock from 'auth0-lock'
import { APP_COLORS} from './common/constants';


export default class AuthService {
    
    constructor(clientId, domain, identityServiceDomain) {
        this.auth0 = new Auth0({
            clientID: clientId,
            domain: domain
        });
        
        this.lock = new Auth0Lock(clientId, domain, {
            closable: false,
            theme: {
                logo: '/img/logo-single.png',
                primaryColor: APP_COLORS['primary']
            }
        });

        const authResult = this.auth0.parseHash(window.location.hash)

        if (authResult) {
            if (authResult.accessToken && authResult.idToken) {
                this._setAccessToken(authResult.accessToken)
            }
        }

        this.lock.on('authorization_error', this._authorizationError.bind(this))
        this.lock.on('unrecoverable_error', this._unrecoverableError.bind(this))

        this.showLoginWidget = this.showLoginWidget.bind(this)
        this._identityServiceDomain = identityServiceDomain
    }

    _authorizationError(error) {
        console.log('Authentication Error', error)
    }

    _unrecoverableError(error) {
        console.log('Unrecoverable Error', error)
    }    

    showLoginWidget() {
        this.lock.show()
    }

    loggedIn() {
        const token = this.getAccessToken()
        return !!token;
    }

    getUserFromService() {
        var accessToken = this.getAccessToken();
        return new Promise(
            (resolve, reject) => {
                $.get({
                    url: `http://${this._identityServiceDomain}/user`,
                    dataType: 'json',
                    headers: {'Authorization': `Bearer ${accessToken}`}
                }).done((userResponse) => {
                    resolve(userResponse.user);
                }).fail((xhr) => {
                    if (xhr.status == 404) {
                        $.post({
                            url: `http://${this._identityServiceDomain}/user`,
                            dataType: 'json',
                            headers: {'Authorization': `Bearer ${accessToken}`}
                        }).done((userResponse) => {
                            resolve(userResponse.user);
                        }).fail(() => {
                            reject(xhr.status);
                            console.log('Error loading the User');
                        })
                    } else {
                        reject(xhr.status);
                        console.log('Error loading the User')
                    }
                });
            });
    }

    logout() {
        localStorage.removeItem('acess_token');
    }

    _setAccessToken(accessToken) {
        localStorage.setItem('access_token', accessToken)
    }

    getAccessToken() {
        return localStorage.getItem('access_token')
    }
}
