import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';

const StorageName = 'exerack';

export const getAuth = () => {
    return Cookies.getJSON(StorageName);
}

export const getAuthDecode = () => {
    const auth = Cookies.getJSON(StorageName);
    return auth ? jwtDecode(auth) : null;
}

export const setAuthUser = (token) => {
    const { exp } = jwtDecode(token);
    const dateExpiry = exp * 1000;

    Cookies.set(StorageName, token, { expires: new Date(dateExpiry) })

    return getAuth()
}

export const clearAuth = () => {
    Cookies.remove(StorageName)
}

export const getAuthToken = () => {
    const token = {};

    if (Cookies.getJSON(StorageName)) {
        token.key = 'Authorization';
        token.value = `Bearer ${Cookies.getJSON(StorageName)}`
    }

    return token;
}