import { DO_LOGIN, CHECK_LOGIN, LOGOUT, SEARCH_FRIEND, SET_SOCKET, GET_REQUEST, UPDATE_REQUEST,baseurl, GET_FRIEND, SEND_REQUEST, SET_CHAT, SET_ONLINE_CHAT, DEL_CHAT_ID } from "../action/action";

const initState = {
    user:null,
    username:null,
    loggedIn:false,
    searchResult:null,
    socket:null,
    notification:0,
    friendRequest:[],
    friend:null,
    userid:null,
    friendId:[],
    curChat:null,
    messages:[],
    unreadeChat:0
}
function rootReducer(state=initState,action){
    const {type,payload} = action
    switch (type) {
        case DO_LOGIN : return {...state,user:payload.token,username:payload.data.firstname}
        case CHECK_LOGIN:
            return {...state,loggedIn:true,user:payload.user,username:payload.username,userid:payload.userid}
        case LOGOUT:return {...state,user:null,loggedIn:false,username:null}
        case SEARCH_FRIEND:return {...state,searchResult:payload}
        case SET_SOCKET:return {...state,socket:payload}
        case GET_REQUEST:return {...state,friendRequest:payload}
        case UPDATE_REQUEST:return {...state,friendRequest:[...state.friendRequest,payload]}
        case GET_FRIEND:
            const friendId = (payload.friend.map(o=>o.friendId[0]._id))
            return {...state,friend:payload.friend,friendId}
        case SEND_REQUEST:return {...state,searchResult:null}
        case SET_CHAT:return {...state,curChat:payload,messages:action.data}
        case SET_ONLINE_CHAT:return {...state,messages:[...state.messages,payload]}
        case DEL_CHAT_ID:
            alert("delchat fired")
            return {...state,curChat:null,messages:[]}

        default : return state
    }
}
export default rootReducer