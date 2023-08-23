import {authHost, publicHost} from "./init_axios";

export const postLoginData = async (data) => {
    const url = `users/signin/`;

    return await publicHost.post(url, data)
        .catch(error => error.response);
}

export const postGithubCode = async (data) => {
    const url = `users/signin/github/`;

    return await publicHost.post(url, data)
        .catch(error => error.response);
}

export const postRegistrationData = async (data) => {
    const url = `users/signup/`;

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

export const postRefreshTokenForRefresh = async () => {
    const url = `users/token/refresh/`;

    return await publicHost.post(url, {})
        .catch(error => error.response);
}

export const postRefreshTokenForDestroy = async (data) => {
    const url = `users/token/destroy/`;

    return await publicHost.post(url, data)
        .catch(error => error.response);
}

export const getCheckAuthIsValid = async () => {
    const url = `users/token/check/`;

    return await authHost.get(url)
        .catch(error => error.response);
}