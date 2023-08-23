import React, {useContext, useState} from 'react';
import {Button, Container, Navbar} from "react-bootstrap";
import RoadRoutesForm from "../forms/RoadRoutesForm";
import {MAIN_ROUTE, USER_PROFILE_ROUTE} from "../../utils/consts";
import {observer} from "mobx-react";
import {Context} from "../../index";
import {NavLink, useNavigate} from "react-router-dom";
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
    const navigate = useNavigate();

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
                    <div className="ms-lg-4 text-center">
                        {
                            user.isAuth ?
                                <Navbar.Text>
                                    <Navbar.Text>
                                        <Button
                                            onClick={() => navigate(USER_PROFILE_ROUTE)}
                                            className="w-100"
                                            variant="dark"
                                        >
                                            Профиль
                                        </Button>
                                    </Navbar.Text>
                                </Navbar.Text> :
                                <>
                                    <Navbar.Text>
                                        <Button
                                            onClick={handleShow}
                                            className="w-100"
                                            variant="dark"
                                        >
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
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
});

export default NavigationBar;