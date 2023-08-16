import React, {useState} from 'react';
import {Marker, Popup} from "react-leaflet";
import axios from "axios";
import {Spinner} from "react-bootstrap";

const GeoMarker = (props) => {
    const data = props.data;
    const {
        geo_position: {
            coordinates: position,
        }
    } = data;

    const [currentWeather, setCurrentWeather] = useState();
    const [currentElevation, setCurrentElevation] = useState();

    const [isLoadingWeather, setIsLoadingWeather] = useState();
    const [isLoadingElevation, setIsLoadingElevation] = useState();

    const loadTempByGeo = ({lat, lng,}) => {
        setIsLoadingWeather(true);

        return axios.get(
            `https://api.openweathermap.org/data/2.5/weather?units=metric` +
            `&appid=${process.env.REACT_APP_WEATHER_API_KEY}` +
            `&lat=${lat}&lon=${lng}`
        ).then(response => setCurrentWeather(response.data.main.temp));
    }

    const loadElevationByGeo = ({lat, lng,}) => {
        setIsLoadingElevation(true);

        return axios.get(
            `https://api.open-elevation.com/api/v1/lookup?locations=` +
            `${lat},${lng}`
        ).then(response => setCurrentElevation(response.data.results[0].elevation));
    }

    return (
        <Marker
            position={[position[1], position[0],]}
            eventHandlers={{
                click: (e) => {
                    loadTempByGeo(e.latlng).then(setIsLoadingWeather(false));
                    loadElevationByGeo(e.latlng).then(setIsLoadingElevation(false));
                },
            }}>
            <Popup>
                <p className="my-1">
                    Стоимость ДТ:
                </p>
                {
                    (data.diesel_fuel !== "") &&
                    <li>
                        ДТ: {data.diesel_fuel}
                    </li>
                }
                {
                    (data.diesel_fuel_taneco !== "") &&
                    <li>
                        ДТ
                        ТАНЕКО: {data.diesel_fuel_taneco}
                    </li>
                }
                {
                    (data.diesel_fuel === "" && data.diesel_fuel_taneco === "") &&
                    <li>
                        данные отсутствуют
                    </li>
                }
                <p className="my-1">
                    Над уровнем моря:&nbsp;
                    {
                        isLoadingElevation ?
                            <Spinner animation="grow"/> :
                            <>
                                {currentElevation} м
                            </>
                    }
                </p>
                <p className="my-1">
                    Температура:&nbsp;
                    {
                        isLoadingWeather ?
                            <Spinner animation="grow"/> :
                            <>
                                {currentWeather} &#8451;
                            </>
                    }
                </p>
            </Popup>
        </Marker>
    );
};

export default GeoMarker;