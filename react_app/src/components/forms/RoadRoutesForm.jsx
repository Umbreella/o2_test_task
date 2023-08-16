import React, {useEffect, useState} from 'react';
import {Form} from "react-bootstrap";
import {getListRoadRoutes} from "../../http/RoadRoutesAPI";
import {getListGasStations} from "../../http/GasStationsAPI";

const RoadRoutesForm = (props) => {
    const {
        func: {
            setRoadRouteGeoPoints,
            setGasStationList,
            setTotalDistance,
            setTotalTime,
        }
    } = props;

    const [roadRouteList, setRoadRouteList] = useState();
    const [roadRoutesIsLoading, setRoadRoutesIsLoading] = useState(false);

    const clearUseState = () => {
        setRoadRouteGeoPoints(undefined);
        setGasStationList(undefined);
        setTotalDistance(undefined);
        setTotalTime(undefined);
    }

    const loadRoadRoute = (roadRouteId) => {
        getListRoadRoutes(roadRouteId)
            .then(response => {
                setRoadRouteGeoPoints(response.geo_route.coordinates[0]);
            });
    };

    const loadGasStation = (roadRouteId) => {
        getListGasStations(roadRouteId)
            .then(response => {
                setGasStationList(response);
            });
    }

    useEffect(() => {
        getListRoadRoutes()
            .then(response => {
                setRoadRouteList(response);
            })
    }, []);

    return (
        <Form>
            <Form.Group>
                <Form.Select onChange={({target: {value}}) => {
                    clearUseState();

                    const selectedOption = JSON.parse(value);
                    if (selectedOption !== null) {
                        loadRoadRoute(selectedOption);
                        loadGasStation(selectedOption);
                    }

                    setRoadRoutesIsLoading(true);
                    setTimeout(() => setRoadRoutesIsLoading(false), 1500);

                }} disabled={roadRoutesIsLoading}>
                    <option value="null">Не выбрано</option>
                    {
                        roadRouteList?.map((value, index) =>
                            <option key={index} value={value.id}>
                                {value.start_point} -> {value.end_point}
                            </option>
                        )
                    }
                </Form.Select>
            </Form.Group>
        </Form>
    );
};

export default RoadRoutesForm;