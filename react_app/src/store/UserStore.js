import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor(props) {
        this._isAuth = false;
        this._username = 'Username';
        this._authType = undefined;
        makeAutoObservable(this);
    }

    setIsAuth(isAuth) {
        this._isAuth = isAuth;
    }

    get isAuth() {
        return this._isAuth;
    }

    setUsername(username) {
        this._username = username;
    }

    get username() {
        return this._username;
    }

    setAuthType(authType) {
        this._authType = authType;
    }

    get authType() {
        return this._authType;
    }
}