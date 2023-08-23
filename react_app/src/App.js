import React, {useContext, useEffect} from "react";
import MainRoute from "./components/routes/MainRoute";
import {Context} from "./index";
import {getCheckAuthIsValid, postRefreshTokenForRefresh} from "./http/UserAPI";

function App() {
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
        <>
            <MainRoute/>
        </>
    );
}

export default App;
