import React, {useState} from 'react';
import NavigationBar from "../header/NavigationBar";
import MapPage from "../map/MapPage";
import {Container} from "react-bootstrap";

const MainPage = () => {
    const [roadRouteGeoPoints, setRoadRouteGeoPoints] = useState();
    const [gasStationList, setGasStationList] = useState();
    const [totalDistance, setTotalDistance] = useState();
    const [totalTime, setTotalTime] = useState();

    return (
        <>
            <NavigationBar func={{
                setRoadRouteGeoPoints,
                setGasStationList,
                setTotalDistance,
                setTotalTime,
            }}/>
            <Container className="mt-2">
                {
                    totalDistance &&
                    <p>
                        Общее расстояние маршрута: {totalDistance} км.
                    </p>
                }
                {
                    totalTime &&
                    <p>
                        Общее время на маршрут: {totalTime} ч.
                    </p>
                }
            </Container>
            <MapPage
                data={{roadRouteGeoPoints, gasStationList,}}
                func={{setTotalDistance, setTotalTime,}}
            />
        </>
    );
};

export default MainPage;