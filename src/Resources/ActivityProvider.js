import HttpRequest from "./HttpRequest";
import { getAuthToken } from '../Assets/js/Authentication';

class ActivityProvider extends HttpRequest {
    createActivity (payload) {
        this.setHeader(getAuthToken())
        return this.post('/activities', payload);
    }
}

export default ActivityProvider;