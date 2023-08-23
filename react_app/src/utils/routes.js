import {GITHUB_OAUTH_COMPLETE, MAIN_ROUTE, USER_PROFILE_ROUTE} from "./consts";
import MainPage from "../components/pages/MainPage";
import UserProfile from "../components/pages/UserProfile";
import GithubOAuth from "../components/pages/GithubOAuth";

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: MainPage,
    },
    {
        path: USER_PROFILE_ROUTE,
        Component: UserProfile,
    },
]
export const techRoutes = [
    {
        path: GITHUB_OAUTH_COMPLETE,
        Component: GithubOAuth,
    },
]