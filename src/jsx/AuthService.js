import Auth0 from 'auth0-js'
import Auth0Lock from 'auth0-lock'
import decode from 'jwt-decode';
import { EventEmitter } from 'events'
import { APP_COLORS} from './common/constants';

export default class AuthService extends EventEmitter {
    
    constructor(clientId, domain, identityServiceDomain) {
        super();

        this.auth0 = new Auth0({
            clientID: clientId,
            domain: domain
        })
        this.lock = new Auth0Lock(clientId, domain, {
            closable: false,
            theme: {
                logo: '/img/logo-single.png',
                primaryColor: APP_COLORS['primary']
            }
        })

        const authResult = this.auth0.parseHash(window.location.hash)

        if (authResult) {
            if (authResult.accessToken && authResult.idToken) {
                this._setToken(authResult.idToken)

                $.post({
                    url: `http://${identityServiceDomain}/user`,
                    dataType: 'json',
                    headers: {'Authorization': `Bearer ${authResult.accessToken}`}
                }).done((userResponse) => {
                    this.setUser(userResponse.user)
                }).fail((error) => {
                    console.log('Error loading the User', error)                        
                });
            }
        }

        this.lock.on('authorization_error', this._authorizationError.bind(this))
        this.lock.on('unrecoverable_error', this._unrecoverableError.bind(this))

        this.login = this.login.bind(this)
    }

    _authorizationError(error) {
        console.log('Authentication Error', error)
    }

    _unrecoverableError(error) {
        console.log('Unrecoverable Error', error)
    }    

    login() {
        this.lock.show()
    }

    loggedIn() {
        const token = this._getToken()
        return !!token && !isTokenExpired(token)
    }

    setUser(user){
        localStorage.setItem('user', JSON.stringify(user))
        this.emit('user_updated', user)
    }

    getUser(){
        const user = localStorage.getItem('user')
        return user ? JSON.parse(localStorage.user) : {}
    }

    _setToken(idToken) {
        localStorage.setItem('id_token', idToken)
    }

    _getToken() {
        return localStorage.getItem('id_token')
    }

    logout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('user');
    }
}


function getTokenExpirationDate(token) {
    const decoded = decode(token)
    
    if(!decoded.exp) {
        return null
    }

    const date = new Date(0) // The 0 here is the key, which sets the date to the epoch
    date.setUTCSeconds(decoded.exp)
    
    return date
}


function isTokenExpired(token) {
    const date = getTokenExpirationDate(token)
    const offsetSeconds = 0
    
    if (date === null) {
        return false
    }

    return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)))
}
