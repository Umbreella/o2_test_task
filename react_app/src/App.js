import React from "react";
import MainRoute from "./components/routes/MainRoute";
import TechRoute from "./components/routes/TechRoute";
import {techRoutes} from "./utils/routes";
import {useLocation} from "react-router-dom";

function App() {
    const {pathname} = useLocation();
    const isTechPage = techRoutes.some(() => pathname.startsWith('/oauth/complete/'));

    return (
        <>
            {
                isTechPage ?
                    <TechRoute/> :
                    <MainRoute/>
            }
        </>
    );
}

export default App;
