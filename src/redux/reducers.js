import { combineReducers} from 'redux'
import { SAVE_USER } from './action-types'
import {getItem, setItem} from "../utils/storage";


const initUser={
    user:getItem('user') || {},
    token:getItem('token') || ''
};
function name(prevState=initUser,action) {
    switch (action.type) {
        case SAVE_USER:
            //存入localhost
            setItem('user',action.data.user);
            setItem('token',action.data.token);
            return  action.data;
        default:
            return prevState;
    }
}
export default combineReducers({
    name
})
