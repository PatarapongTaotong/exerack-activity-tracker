import HttpRequest from "./HttpRequest";
import { getAuthToken } from '../Assets/js/Authentication';

class ActivityProvider extends HttpRequest {
    createActivity (payload) {
        this.setHeader(getAuthToken())
        return this.post('/activities', payload);
    }

    getActivitiesByUserId (uid, limit) {
        this.setHeader(getAuthToken())
        return this.get(`/activities/${uid}/user-id?limit=${limit}`);
    }

    editActivityByUserId (id, payload) {
        this.setHeader(getAuthToken())
        return this.patch(`/activities/${id}`, payload);
    }
}

export default ActivityProvider;