import React, {useContext, useEffect, useState} from 'react';
import NavigationBar from "../header/NavigationBar";
import MapPage from "../map/MapPage";
import {Container, Spinner} from "react-bootstrap";
import {useSearchParams} from "react-router-dom";
import {postGithubCode} from "../../http/UserAPI";
import {Context} from "../../index";

const MainPage = () => {
    const {user} = useContext(Context);

    const [roadRouteGeoPoints, setRoadRouteGeoPoints] = useState();
    const [gasStationList, setGasStationList] = useState();
    const [totalDistance, setTotalDistance] = useState();
    const [totalTime, setTotalTime] = useState();
    const [searchParams, setSearchParams] = useSearchParams();

    const [isLoadOauth, setIsLoadOauth] = useState();

    const loginUserWithGithub = async (data) => {
        setIsLoadOauth(true)

        const {
            data: {
                access,
            },
            status,
        } = await postGithubCode(data);

        setIsLoadOauth(false);

        if (status !== 200) {
            return null;
        }

        user.setIsAuth(true);
        localStorage.setItem("access", access);
    }


    useEffect(() => {
        if (searchParams.has('code')) {
            const code = searchParams.get('code');
            searchParams.delete('code');

            loginUserWithGithub({code}).then();

            setSearchParams(searchParams);
        }
    })

    return (
        <>
            {
                isLoadOauth ?
                    <div
                        className="d-flex justify-content-center vh-100 align-items-center">
                        <Spinner animation="grow" variant="primary"/>
                    </div> :
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
                                    Общее расстояние
                                    маршрута: {totalDistance} км.
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
            }
        </>
    );
};

export default MainPage;