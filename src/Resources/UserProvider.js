import HttpRequest from "./HttpRequest";

class UserProvider extends HttpRequest {
    createUser (payload) {
        return this.post('/users', payload);
    }
}

export default UserProvider;