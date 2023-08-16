import React, {useContext, useEffect, useState} from 'react';
import {Button, Form, Spinner} from "react-bootstrap";
import {Context} from "../../index";
import * as yup from "yup";
import {Formik} from "formik";
import {
    getUserProfile,
    patchUserProfile,
    postLoginData
} from "../../http/UserAPI";
import jwtDecode from "jwt-decode";

const ProfileForm = () => {
    const {user} = useContext(Context);

    const [isPostedLoginRequest, setIsPostedLoginRequest] = useState(false);
    const [initUserData, setInitUserData] = useState();

    const loadUserProfile = async () => {
        const {
            data,
            status,
        } = await getUserProfile();

        if (status !== 200) {
            return null;
        }

        setInitUserData(data);
    }

    const changeUserProfile = async (data, actions) => {
        const {
            data: {
                username,
            },
            status,
        } = await patchUserProfile(data);

        if (status !== 200) {
            return null;
        }

        user.setUsername(username);
    }

    useEffect(() => {
        loadUserProfile().then();
    }, [])

    const schema = yup.object().shape({
        email: yup.string()
            .email("Неверный email")
            .required("Обязательное поле"),
        username: yup.string()
            .required("Обязательное поле"),
        first_name: yup.string()
            .required("Обязательное поле"),
        last_name: yup.string()
            .required("Обязательное поле"),
        password: yup.string(),
    });

    return (
        <div>
            {
                initUserData === undefined ?
                    <div className="d-flex justify-content-center">
                        <Spinner animation="border"/>
                    </div> :
                    <Formik
                        validationSchema={schema}
                        initialValues={initUserData}
                        onSubmit={changeUserProfile}
                    >
                        {
                            ({
                                 handleSubmit,
                                 handleChange,
                                 values,
                                 touched,
                                 errors,
                             }) => (
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            Имя
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="first_name"
                                            placeholder="Введите Ваше имя"
                                            value={values.first_name}
                                            onChange={handleChange}
                                            isValid={
                                                touched.first_name && !errors.first_name
                                            }
                                            isInvalid={!!errors.first_name}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.first_name}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            Фамилия
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="last_name"
                                            placeholder="Введите Вашу фамилию"
                                            value={values.last_name}
                                            onChange={handleChange}
                                            isValid={
                                                touched.last_name && !errors.last_name
                                            }
                                            isInvalid={!!errors.last_name}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.last_name}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            Почта
                                        </Form.Label>
                                        <Form.Control
                                            type="email"
                                            id="email"
                                            placeholder="Введите email"
                                            value={values.email}
                                            onChange={handleChange}
                                            isValid={touched.email && !errors.email}
                                            isInvalid={!!errors.email}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            Логин
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="username"
                                            placeholder="Введите логин"
                                            value={values.username}
                                            onChange={handleChange}
                                            isValid={touched.username && !errors.username}
                                            isInvalid={!!errors.username}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.username}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            Пароль
                                        </Form.Label>
                                        <Form.Control
                                            type="password"
                                            id="password"
                                            placeholder="Введите новый пароль"
                                            value={values.password}
                                            onChange={handleChange}
                                            isValid={
                                                touched.password && !errors.password
                                            }
                                            isInvalid={!!errors.password}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.password}
                                        </Form.Control.Feedback>
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
                                                    variant="primary"
                                                    type="submit"
                                                >
                                                    Сохранить
                                                </Button>
                                        }
                                    </div>
                                </Form>
                            )
                        }
                    </Formik>
            }
        </div>
    );
};

export default ProfileForm;