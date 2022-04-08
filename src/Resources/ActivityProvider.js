import HttpRequest from "./HttpRequest";

class ActivityProvider extends HttpRequest {
    createActivity (payload) {
        return this.post('/activities', payload);
    }
}

export default ActivityProvider;