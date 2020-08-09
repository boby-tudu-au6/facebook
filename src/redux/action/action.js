import Axios from "axios"

export const DO_LOGIN = 'DO_LOGIN'
export const CHECK_LOGIN = 'CHECK_LOGIN'
export const LOGOUT = 'LOGOUT'
export const SEARCH_FRIEND = 'SEARCH_FRIEND'
export const SEND_REQUEST = 'SEND_REQUEST'
export const GET_REQUEST = 'GET_REQUEST'
export const SET_SOCKET = 'SET_SOCKET'
export const GET_NOTIFICATION = 'GET_NOTIFICATION'
export const UPDATE_REQUEST = 'UPDATE_REQUEST'
export const GET_FRIEND = 'GET_FRIEND'
export const SET_PROFILE = 'SET_PROFILE'
export const SET_CHAT = 'SET_CHAT'
export const SET_ONLINE_CHAT = 'SET_ONLINE_CHAT'
export const SET_UNREAD = 'SET_UNREAD'
export const DEL_CHAT_ID = 'DEL_CHAT_ID'









export const baseurl = "http://localhost:8080"
// export const baseurl = "https://s2d4h.sse.codesandbox.io"

export const doLogin = ({phoneEmail,password}) => async dispatch =>{
    // console.log("doLogin called")
    let firstdata = 'phone';
        const testdata = phoneEmail.value.search("@")
        if(testdata!==-1){
            firstdata = 'email'
        }
        const {data} = await Axios.post(`${baseurl}/login`,{
            [firstdata]:phoneEmail.value,
            password:password.value
        })
        if(data.data!==undefined){
            localStorage.setItem("user",data.token)
            localStorage.setItem("username",data.data.firstname)
            localStorage.setItem("userid",data.data._id)
            return dispatch({
                type:DO_LOGIN,
                payload:data
            })
        }
        alert("login failed")
}

export const checkLogin =()=>dispatch=>{
    // console.log("checkLogin called")
    const user = localStorage.getItem('user')
    const username = localStorage.getItem("username")
    const userid = localStorage.getItem("userid")
    if(user){
        return dispatch({type:CHECK_LOGIN,payload:{user,username,userid}})
    }
}

export const setChat = payload => async dispatch =>{
    const {data} = await Axios.post(`${baseurl}/getchat`,{
        userid:localStorage.getItem('userid'),
        friendid:payload.friendid
    })
    return dispatch({
        type:SET_CHAT,
        payload,
        data
    })
}

export const setOnlineChat = payload =>dispatch =>{
    return dispatch({
        type:SET_ONLINE_CHAT,
        payload
    })
}

export const logout = ()=>dispatch=>{
    // console.log("logout called")
    localStorage.removeItem("user")
    localStorage.removeItem("username")
    localStorage.removeItem("userid")
    return dispatch({type:LOGOUT})
}

export const searchFriend = (payload) =>async dispatch=>{
    // console.log("searchFriend called")
    if(payload!==""){
        const {data} = await Axios.post(`${baseurl}/search`,{q:payload})
        return dispatch({
            type:SEARCH_FRIEND,
            payload:data.user
        })
    }else{
        return dispatch({
            type:SEARCH_FRIEND,
            payload:null
        })
    }
}


export const setSocket = payload => dispatch =>{
    // console.log("setSocket called")
    return dispatch({
        type:SET_SOCKET,
        payload
    })
}
export const getRequest = payload =>async dispatch =>{
    // console.log("getRequest called")
    const {data} = await Axios.post(`${baseurl}/getrequest`,{_id:payload})
    return dispatch({
        type:GET_REQUEST,
        payload:data
    })
}
export const updateRequest = payload => async dispatch =>{
    // console.log("update request called")
    // console.log(payload)
    return dispatch({
        type:UPDATE_REQUEST,
        payload
    })
}
export const getFriend = ()=>async dispatch =>{
    // console.log("getFriend called")
    const userid = localStorage.getItem("userid")
    const {data} = await Axios.post(`${baseurl}/getfriend`,{_id:userid})
    return dispatch({
        type:GET_FRIEND,
        payload:data
    })
}
export const sendRequest = ()=>dispatch=>{
    return dispatch({
        type:SEND_REQUEST
    })
}
export const delChatId = ()=>dispatch=>{
    return dispatch({type:DEL_CHAT_ID})
}