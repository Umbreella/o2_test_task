import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor(props) {
        this._isAuth = false;
        this._username = 'Username';
        makeAutoObservable(this);
    }

    setIsAuth(bool) {
        this._isAuth = bool;
    }

    get isAuth() {
        return this._isAuth;
    }

    setUsername(str) {
        this._username = str;
    }

    get username() {
        return this._username;
    }
}