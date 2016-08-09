import Auth0 from 'auth0-js'
import Auth0Lock from 'auth0-lock'

export default class AuthService {
    constructor(clientId, domain) {
        this.auth0 = new Auth0({
            clientID: clientId,
            domain: domain
        })
        this.lock = new Auth0Lock(clientId, domain, {
            closable: false
        })

        const authResult = this.auth0.parseHash(window.location.hash)

        if (authResult) {
            if (authResult.idToken) {
                this.setToken(authResult.idToken)
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
        return !!this.getToken()
    }

    setToken(idToken) {
        localStorage.setItem('id_token', idToken)
    }

    getToken() {
        return localStorage.getItem('id_token')
    }

    logout() {
        localStorage.removeItem('id_token');
    }
}
