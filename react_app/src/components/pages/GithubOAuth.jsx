import React, {useContext, useEffect} from 'react';
import {Spinner} from "react-bootstrap";
import {postGithubCode} from "../../http/UserAPI";
import {useNavigate, useSearchParams} from "react-router-dom";
import {MAIN_ROUTE} from "../../utils/consts";
import {Context} from "../../index";

const GithubOAuth = () => {
    const {user} = useContext(Context);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const loginUserWithGithub = async (data) => {
        const {
            data: {
                access,
            },
            status,
        } = await postGithubCode(data);


        if (status !== 200) {
            return null;
        }

        user.setAccessToken(access);
        navigate(MAIN_ROUTE);
    }


    useEffect(() => {
        if (searchParams.has('code')) {
            const code = searchParams.get('code');
            loginUserWithGithub({code}).then();
        }
    })

    return (
        <div
            className="d-flex justify-content-center vh-100 align-items-center">
            <Spinner animation="grow" variant="primary"/>
        </div>
    );
};

export default GithubOAuth;