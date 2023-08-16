import {MAIN_ROUTE, USER_PROFILE_ROUTE} from "./consts";
import MainPage from "../components/pages/MainPage";
import UserProfile from "../components/pages/UserProfile";

export const authRoutes = [
    {
        path: MAIN_ROUTE,
        Component: MainPage,
    },
    {
        path: USER_PROFILE_ROUTE,
        Component: UserProfile,
    },
]