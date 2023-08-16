import React from 'react';
import {Modal} from "react-bootstrap";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AuthUserForm from "../forms/AuthUserForm";
import RegUserForm from "../forms/RegUserForm";

const AuthUserModal = (props) => {
    const {
        data: {show},
        func: {
            handleClose,
        },
    } = props;

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>O2 RUS</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tabs
                    defaultActiveKey="login"
                    id="uncontrolled-tab-example"
                    className="mb-3 d-flex flex-row justify-content-center"
                >
                    <Tab eventKey="login" title="Авторизация">
                        <AuthUserForm/>
                    </Tab>
                    <Tab eventKey="registration" title="Регистрация">
                        <RegUserForm/>
                    </Tab>
                </Tabs>
            </Modal.Body>
        </Modal>
    );
};

export default AuthUserModal;