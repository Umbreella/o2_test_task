import React, {useContext, useState} from 'react';
import {Button, Form, Spinner} from "react-bootstrap";
import {postLoginData} from "../../http/UserAPI";
import {Formik} from "formik";
import * as yup from "yup";
import {Context} from "../../index";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub} from "@fortawesome/free-brands-svg-icons";

const AuthUserForm = () => {
    const {user} = useContext(Context);
    const [isPostedLoginRequest, setIsPostedLoginRequest] = useState(false);

    const loginUser = async (data, actions) => {
        setIsPostedLoginRequest(true);

        const {
            data: {
                access,
            },
            status,
        } = await postLoginData(data);

        setIsPostedLoginRequest(false);

        if (status !== 200) {
            actions.setFieldError(
                "password",
                "Неверные данные пользователя",
            )
            return null;
        }

        user.setAccessToken(access);
    }

    const schema = yup.object().shape({
        email: yup.string()
            .email("Неверный email")
            .required("Обязательное поле"),
        password: yup.string()
            .required("Обязательное поле"),
    });

    return (
        <div>
            <Formik
                validationSchema={schema}
                initialValues={{
                    email: '',
                    password: '',
                }}
                onSubmit={loginUser}
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
                                    Пароль
                                </Form.Label>
                                <Form.Control
                                    type="password"
                                    id="password"
                                    placeholder="Введите пароль"
                                    name="password"
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
                                            variant="primary" type="submit"
                                        >
                                            Авторизоваться
                                        </Button>
                                }
                                <p className="my-2">
                                    или
                                </p>
                                <div>
                                    <a href={
                                        `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`
                                    }>
                                        <Button variant="secondary">
                                            <FontAwesomeIcon icon={faGithub}/>
                                            &nbsp; Github
                                        </Button>
                                    </a>
                                </div>
                            </div>
                        </Form>
                    )
                }
            </Formik>
        </div>
    );
};

export default AuthUserForm;