import axios from 'axios';
import { REGISTER_FAIL, REGISTER_SUCCESS } from './types';
import { setAlert } from './alert';
import qs from 'qs';

export const register = ({ name, email, phone, password}) => async dispatch => {
        
        try {
            const res = await axios.post('/api/users', JSON.stringify(
                {name, email, phone, password}
            )).then((res) => {
                console.log(res.data)
            }).catch((err) => {
                console.log(err)
            })
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
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