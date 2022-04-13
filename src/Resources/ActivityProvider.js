import HttpRequest from "./HttpRequest";
import { getAuthToken } from '../Assets/js/Authentication';

class ActivityProvider extends HttpRequest {
    createActivity (payload) {
        this.setHeader(getAuthToken())
        return this.post('/activities', payload);
    }

    getActivitiesByUserId (uid) {
        this.setHeader(getAuthToken())
        return this.get(`/activities/${uid}/user-id?limit=20`);
    }

    editActivityByUserId (id, payload) {
        this.setHeader(getAuthToken())
        return this.patch(`/activities/${id}`, payload);
    }
}

export default ActivityProvider;