import React, {useContext, useState} from 'react';
import {Button, Container, Navbar} from "react-bootstrap";
import RoadRoutesForm from "../forms/RoadRoutesForm";
import {MAIN_ROUTE, USER_PROFILE_ROUTE} from "../../utils/consts";
import {observer} from "mobx-react";
import {Context} from "../../index";
import {NavLink} from "react-router-dom";
import AuthUserModal from "../modals/AuthUserModal";

const NavigationBar = observer((props) => {
    const {
        func: {
            setRoadRouteGeoPoints,
            setGasStationList,
            setTotalDistance,
            setTotalTime,
        },
    } = props;

    const {user} = useContext(Context);
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => {
        setShow(true);
    }

    return (
        <Navbar bg="primary" data-bs-theme="dark" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand>
                    <NavLink to={MAIN_ROUTE}>
                        O2 RUS
                    </NavLink>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav"
                                 className="d-lg-flex flex-lg-row justify-content-lg-end">
                    <div className="my-2">
                        <RoadRoutesForm func={{
                            setRoadRouteGeoPoints,
                            setGasStationList,
                            setTotalDistance,
                            setTotalTime,
                        }}/>
                    </div>
                    {
                        user.isAuth ?
                            <Navbar.Text>
                                Вы авторизованы как:&nbsp;
                                <NavLink to={USER_PROFILE_ROUTE}>
                                    {user.username}
                                </NavLink>
                            </Navbar.Text> :
                            <>
                                <Navbar.Text>
                                    <Button onClick={handleShow}>
                                        Войти
                                    </Button>
                                </Navbar.Text>
                                <AuthUserModal
                                    data={{
                                        show,
                                    }}
                                    func={{
                                        handleClose,
                                    }}
                                />
                            </>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
});

export default NavigationBar;