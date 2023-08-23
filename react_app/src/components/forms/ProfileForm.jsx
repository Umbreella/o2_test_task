import React, {useContext, useEffect, useState} from 'react';
import {Button, Form, Spinner} from "react-bootstrap";
import {Context} from "../../index";
import * as yup from "yup";
import {Formik} from "formik";
import {
    getUserProfile,
    patchUserProfile,
    postRefreshTokenForRefresh
} from "../../http/UserAPI";
import {useNavigate} from "react-router-dom";
import {MAIN_ROUTE} from "../../utils/consts";

const ProfileForm = (props) => {
    const {
        func: {
            setHasPermission,
        },
    } = props;

    const {user} = useContext(Context);
    const [initUserData, setInitUserData] = useState();
    const [isPostedLoginRequest, setIsPostedLoginRequest] = useState(false);
    const navigate = useNavigate();

    const refreshAccessToken = async () => {
        const {
            data: {
                access: accessToken,
            },
            status: access_status,
        } = await postRefreshTokenForRefresh();

        if (access_status !== 200) {
            user.removeAccessToken();
            return false;
        }

        user.setAccessToken(accessToken);
        return true;
    }

    const loadUserProfile = async () => {
        const {
            data,
            status,
        } = await getUserProfile();

        if (status !== 200) {
            const isUpdateAccessToken = await refreshAccessToken();

            if (isUpdateAccessToken) {
                const repeat_request = await getUserProfile();
                setInitUserData(repeat_request.data);
            } else {
                setHasPermission(false);
            }

            return null;
        }

        setInitUserData(data);
    }

    const changeUserProfile = async (data, actions) => {
        setIsPostedLoginRequest(true);

        const {data: errors, status} = await patchUserProfile(data);

        if (status === 401) {
            const isUpdateAccessToken = await refreshAccessToken();

            if (isUpdateAccessToken) {
                await patchUserProfile(data);
            } else {
                navigate(MAIN_ROUTE);
            }
        }

        setIsPostedLoginRequest(false);

        if (status !== 200) {
            const fields = Object.keys(errors)

            fields.forEach((value) => {
                actions.setFieldError(
                    value,
                    'Сохранение невозможно.',
                )
            });

            return null;
        }
    }

    useEffect(() => {
        loadUserProfile().then();
    })

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
                initUserData &&
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