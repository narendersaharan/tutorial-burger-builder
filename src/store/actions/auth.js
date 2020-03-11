import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return{
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) =>{
    return{
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}

export const authFail = (error) =>{
    return{
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const auth = (email, password, isSignUp) =>{
    return dispatch =>{
        dispatch(authStart());
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDSv00r5GkYzBlSLwPm0PFDNKr_in1NkmY';
        
        if(!isSignUp){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDSv00r5GkYzBlSLwPm0PFDNKr_in1NkmY';
        }
        
        const userData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        axios.post(url, userData).then(response =>{

            const expirationDate = new Date(new Date().getTime() + (response.data.expiresIn * 1000));
            localStorage.setItem('burgerBuilderToken', response.data.idToken);
            localStorage.setItem('burgerBuilderExpiration', expirationDate);
            localStorage.setItem('burgerBuilderUserId', response.data.localId);

            dispatch(authTokenTimeout(response.data.expiresIn));
            dispatch(authSuccess(response.data.idToken, response.data.localId));
        }, error => {
            dispatch(authFail(error.response.data.error.message));
        })
    }
} 

export const logout = () =>{
    localStorage.removeItem('burgerBuilderToken');
    localStorage.removeItem('burgerBuilderExpiration');
    localStorage.removeItem('burgerBuilderUserId');

    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authTokenTimeout = (expirationTime) => {
    return dispatch => {
       setTimeout(() =>{
            dispatch(logout())
       }, expirationTime * 1000)
    }
}

export const setAuthRedirectPath = (path) =>{
    return{
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () =>{
    return dispatch =>{
        const token = localStorage.getItem('burgerBuilderToken');
        if(!token){
            dispatch(logout());
        }else{
            const expirationDate = new Date(localStorage.getItem('burgerBuilderExpiration'));
            if(expirationDate > new Date()){
                const userId = localStorage.getItem('burgerBuilderUserId');
                dispatch(authSuccess(token, userId));
                dispatch(authTokenTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }else{
                dispatch(logout());
            }
        }
    }
}