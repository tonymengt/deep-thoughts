import decode from 'jwt-decode';

class AuthService {
    // retrieve data saved in token
    getProfile() {
        return decode(this.getToken());
    }

    // check if the user is still logged in
    loggedIn() {
        // check if there is a saved token and it's still valid
        const token = this.getToken();
        // use type coersion to check if token is NOT undefined and the token is NOT expried
        return !!token && !this.isTokenExpired(token);
    }

    // check if the token has expried
    isTokenExpired(token) {
        try{
            const decoded = decode(token);
            if(decoded.exp < Date.now() /1000) {
                return true
            } else {
                return false
            }
        } catch (err) {
            return false;
        }
    }

    // retrieve token from localstorage
    getToken() {
        // retrieves the use token from localstorage
        return localStorage.getItem('id_token')
    }

    // set token to localstorage and reload page to homepage
    login(idToken) {
        // saves user token to localstorage
        localStorage.setItem('id_token', idToken);

        window.location.assign('/')
    }

    // clear token from localstorage and force logout with reload
    logout() {
    // clear user token and profile data from localstorage
    localStorage.removeItem('id_token');
    // this will reload the page and reset the state of the application
    window.location.assign('/')
    }
}

export default new AuthService();