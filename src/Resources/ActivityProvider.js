import HttpRequest from "./HttpRequest";
import { getAuthToken } from '../Assets/js/Authentication';

class ActivityProvider extends HttpRequest {
    createActivity (payload) {
        this.setHeader(getAuthToken())
        return this.post('/activities', payload);
    }

    getActivitiesByUserId (uid, query) {
        this.setHeader(getAuthToken())
        let paginate = [
            `limit=${query.limit}`,
            `sort=${query.sort}`,
            `sortOrder=${query.sortOrder}`,
            `page=${query.page}`
        ].join('&')

        if (query?.types?.length) {
            query.types.forEach((type) => {
                paginate += `&types[]=${type}`
            })
        }

        return this.get(`/activities/${uid}/user-id?${paginate}`);
    }

    editActivityByUserId (id, payload) {
        this.setHeader(getAuthToken())
        return this.patch(`/activities/${id}`, payload);
    }
}

export default ActivityProvider;