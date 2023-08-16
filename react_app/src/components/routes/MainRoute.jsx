import React from 'react';
import {Route, Routes} from "react-router-dom";
import {authRoutes} from "../../utils/routes";

const MainRoute = () => {
    return (
        <Routes>
            {
                authRoutes.map(({path, Component}) =>
                    <Route exact key={path} path={path}
                           element={<Component/>}/>
                )
            }
        </Routes>
    );
};

export default MainRoute;