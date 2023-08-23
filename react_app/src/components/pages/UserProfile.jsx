import React, {useContext, useState} from 'react';
import {Button, Container, Spinner} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import ProfileForm from "../forms/ProfileForm";
import {MAIN_ROUTE} from "../../utils/consts";
import {postRefreshTokenForDestroy} from "../../http/UserAPI";
import {Context} from "../../index";

const UserProfile = () => {
    const {user} = useContext(Context);
    const navigate = useNavigate();

    const [hasPermission, setHasPermission] = useState(true);
    const [isLoadUserProfile, setIsLoadUserProfile] = useState(false);

    const logoutUser = async () => {
        setIsLoadUserProfile(true);

        const {status} = await postRefreshTokenForDestroy();

        setIsLoadUserProfile(false);

        if (status !== 204) {
            return null;
        }

        user.removeAccessToken();

        navigate(MAIN_ROUTE);
    }

    return (
        <div>
            {
                !hasPermission ?
                    <>
                        {
                            navigate(MAIN_ROUTE)
                        }
                    </> :
                    <>
                        {
                            isLoadUserProfile ?
                                <div className="d-flex justify-content-center">
                                    <Spinner animation="border"/>
                                </div> :
                                <Container>
                                    <div className="d-flex justify-content-between my-3">
                                        <Button
                                            onClick={() => navigate(MAIN_ROUTE)}>
                                            Вернуться
                                        </Button>
                                        <Button onClick={logoutUser}>
                                            Выход
                                        </Button>
                                    </div>

                                    <ProfileForm func={{
                                        setHasPermission,
                                        setIsLoadUserProfile,
                                    }}/>
                                </Container>
                        }
                    </>
            }
        </div>
    );
};

export default UserProfile;