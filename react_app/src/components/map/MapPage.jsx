import React from 'react';
import {FeatureGroup, MapContainer, TileLayer} from "react-leaflet";
import RoutingMachine from "./RoutingMachine";
import {Col, Container} from "react-bootstrap";
import GeoMarker from "./GeoMarker";

const MapPage = (props) => {
    const {
        data: {
            roadRouteGeoPoints,
            gasStationList,
        },
        func: {
            setTotalDistance,
            setTotalTime,
        },
    } = props;

    return (
        <Container>
            <Col style={{height: "75vh"}}>
                <MapContainer center={[56.010052, 92.852600]} zoom={3}
                              scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <FeatureGroup>
                        {
                            roadRouteGeoPoints &&
                            <RoutingMachine
                                waypoints={roadRouteGeoPoints}
                                func={{
                                    setTotalDistance,
                                    setTotalTime
                                }}/>
                        }
                    </FeatureGroup>
                    <FeatureGroup>
                        {
                            gasStationList?.map((gasStation, index) =>
                                <GeoMarker
                                    data={gasStation}
                                    key={gasStation.id}
                                />
                            )
                        }
                    </FeatureGroup>
                </MapContainer>
            </Col>
        </Container>
    );
};

export default MapPage;