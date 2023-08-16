import React from 'react';
import {Col, Container} from "react-bootstrap";
import ProfileForm from "../forms/ProfileForm";
import {NavLink} from "react-router-dom";
import {MAIN_ROUTE} from "../../utils/consts";

const UserProfile = () => {
    return (
        <div>
            <Container>
                <Col className="col-6">
                    <NavLink to={MAIN_ROUTE}>
                        Вернуться
                    </NavLink>
                </Col>

                <ProfileForm/>
            </Container>
        </div>
    );
};

export default UserProfile;