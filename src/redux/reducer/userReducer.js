import {REGISTER,LOGIN,ADD_PRODUCT,LOGOUT} from '../action/action'


const initState = {
    user:[],
}
export function userReducer(state = initState,action){
    const {type,payload} = action
    switch(type){
        case LOGOUT: return {...state,isLogged:false,loggedUser:[]}
        default:return state
    }
}
