import HttpRequest from "./HttpRequest";

class AuthProvider extends HttpRequest {
    login (payload) {
        return this.post('/login', payload)
    }
}

export default AuthProvider;