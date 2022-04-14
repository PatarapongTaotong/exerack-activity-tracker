import HttpRequest from "./HttpRequest";
import { getAuthToken } from '../Assets/js/Authentication';

class UserProvider extends HttpRequest {
    createUser (payload) {
        return this.post('/users', payload);
    }

    getUserById (id) {
        this.setHeader(getAuthToken())
        return this.get(`/users/${id}`);
    }

    updateUserById (id, payload) {
        this.setHeader(getAuthToken())
        return this.patch(`/users/${id}`, payload);
    }
}

export default UserProvider;