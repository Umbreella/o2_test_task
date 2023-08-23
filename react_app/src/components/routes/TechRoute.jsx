import React from 'react';
import {Route, Routes} from "react-router-dom";
import {techRoutes} from "../../utils/routes";

const TechRoute = () => {
    return (
        <Routes>
            {
                techRoutes.map(({path, Component}) =>
                    <Route exact key={path} path={path}
                           element={<Component/>}/>
                )
            }
        </Routes>
    );
};

export default TechRoute;