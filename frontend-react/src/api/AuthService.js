import api from './Api'
import {ACCESS_TOKEN_LS, REFRESH_TOKEN_LS, USER_INFO} from "./Api";
import jwt_decode from "jwt-decode";
import {LOGIN_URL} from "./ApiRoutes";


export async function login(username, password) {
    try{
        const response = await api.post(LOGIN_URL, {username, password})
        const {accessToken, refreshToken} = response.data
        localStorage.setItem(ACCESS_TOKEN_LS, accessToken)
        localStorage.setItem(REFRESH_TOKEN_LS, refreshToken)
        localStorage.setItem(USER_INFO, jwt_decode(accessToken))
        console.log(jwt_decode(accessToken))
        return true;
    }
    catch (error){
        // console.log(error)
        return false;
    }
}

export function isAuth(){
    return localStorage.getItem(ACCESS_TOKEN_LS) != null
}

export function clearTokens(){
    localStorage.removeItem(ACCESS_TOKEN_LS)
    localStorage.removeItem(REFRESH_TOKEN_LS)
}
