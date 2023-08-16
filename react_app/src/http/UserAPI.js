import {authHost, publicHost} from "./init_axios";

export const postLoginData = async (data) => {
    const url = `users/token/`;

    return await publicHost.post(url, data)
        .catch(error => error.response);
}

export const getUserProfile = async () => {
    const url = `users/profile/`;

    return await authHost.get(url)
        .catch(error => error.response);
}

export const patchUserProfile = async (data) => {
    const url = `users/profile/`;

    return await authHost.patch(url, data)
        .catch(error => error.response);
}