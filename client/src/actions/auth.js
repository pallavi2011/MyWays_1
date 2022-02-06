import axios from 'axios';
import { REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT} from './types';
import { setAlert } from './alert';
import setAuthToken from '../utility/setAuthToken';

export const loadUser = () => async dispatch => {
        if(localStorage.token){
            setAuthToken(localStorage.token);
        }

        try{
            const res = await axios.get('/api/auth');
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        }
        catch(err){
            dispatch({
                type: AUTH_ERROR,

            })
        }
}

// Register User
export const register = ({ name, email, phone, password})=> async dispatch => {
        
        try {
                const res = await axios.post('http://localhost:5000/api/users',{name, email, phone, password});
                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: res.data
                })
                dispatch(loadUser());
        } catch (error) {
            // const errors = await error.response.data.errors;

            // if(errors){
            //     errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
            // }
            dispatch({
                type: REGISTER_FAIL,
                
            })
        }
}

//Login User
export const login = ({ email, password})=> async dispatch => {
        
    try {
            const res = await axios.post('http://localhost:5000/api/auth',{ email, password});
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
            dispatch(loadUser());
    } catch (error) {
        const errors = await error.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: LOGIN_FAIL,
            
        })
    }
}

export const logout = () => dispatch =>{
    dispatch({
        type: LOGOUT
    })
}