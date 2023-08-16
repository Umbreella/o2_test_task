import {publicHost} from "./init_axios";

export const getListGasStations = async (roadRouteId = null) => {
    const url = `routes/${roadRouteId}/gas_stations/`;

    return await publicHost.get(url)
        .then(response => response.data)
        .catch(error => error.response);
}