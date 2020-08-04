import { DO_LOGIN, CHECK_LOGIN, LOGOUT, SEARCH_FRIEND, SET_SOCKET, GET_REQUEST, UPDATE_REQUEST } from "../action/action";
import io from 'socket.io-client'
const initState = {
    user:null,
    username:null,
    loggedIn:false,
    searchResult:null,
    socket:io("https://s2d4h.sse.codesandbox.io/"),
    notification:null,
    friendRequest:null
}
function rootReducer(state=initState,action){
    const {type,payload} = action
    switch (type) {
        case DO_LOGIN : return {...state,user:payload.token,username:payload.data.firstname}
        case CHECK_LOGIN:
            return {...state,loggedIn:true,user:payload.user,username:payload.username}
        case LOGOUT:return {...state,user:null,loggedIn:false,username:null}
        case SEARCH_FRIEND:return {...state,searchResult:payload}
        case SET_SOCKET:return {...state,socket:payload}
        case GET_REQUEST:return {...state,friendRequest:payload}
        case UPDATE_REQUEST:return {...state,friendRequest:[...state.friendRequest,payload]}
        default : return state
    }
}
export default rootReducer