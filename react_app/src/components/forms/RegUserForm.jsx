import React, {useContext, useState} from 'react';
import {Button, Form, Spinner} from "react-bootstrap";
import {Context} from "../../index";

const RegUserForm = () => {
    const {user} = useContext(Context);
    const [isPostedLoginRequest, setIsPostedLoginRequest] = useState(false);

    return (
        <div>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="text" placeholder="Enter email"/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="text" placeholder="Enter email"/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"/>
                </Form.Group>
                <div
                    className="d-flex flex-column justify-content-center text-center">
                    {
                        isPostedLoginRequest ?
                            <div className="mt-4">
                                <Spinner
                                    animation="grow"
                                    variant="primary"
                                />
                            </div> :
                            <Button
                                variant="primary" type="submit"
                            >
                                Регистрация
                            </Button>
                    }
                </div>
            </Form>
        </div>
    );
};

export default RegUserForm;