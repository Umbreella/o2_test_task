import React, {useContext, useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import {publicRoutes} from "../../utils/routes";
import {Context} from "../../index";
import {
    getCheckAuthIsValid,
    postRefreshTokenForRefresh
} from "../../http/UserAPI";

const MainRoute = () => {
    const {user} = useContext(Context);

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

    useEffect(() => {
        getCheckAuthIsValid()
            .then(
                ({status}) => {
                    if (status !== 200) {
                        refreshAccessToken().then();
                    }

                    user.setIsAuth(true);
                }
            )
    })

    return (
        <Routes>
            {
                publicRoutes.map(({path, Component}) =>
                    <Route exact key={path} path={path}
                           element={<Component/>}/>
                )
            }
        </Routes>
    );
};

export default MainRoute;