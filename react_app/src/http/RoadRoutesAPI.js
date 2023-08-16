import {publicHost} from "./init_axios";

export const getListRoadRoutes = async (roadRouteId = null) => {
    const url = roadRouteId === null ? "routes/" : `routes/${roadRouteId}/`;

    return await publicHost.get(url)
        .then(response => response.data)
        .catch(error => error.response);
}