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
export const START_VIDEO = 'START_VIDEO'




export const baseurl = "http://localhost:8080"

export const doLogin = ({phoneEmail,password}) => async dispatch =>{
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
            console.log(data.token)
            localStorage.setItem("user",data.token)
            return dispatch({
                type:DO_LOGIN,
                payload:data
            })
        }
        alert("login failed")
}
export const checkLogin =()=>async dispatch=>{
    try{
        const user = localStorage.getItem('user')
        if(user){
            const {data} = await Axios.post(`${baseurl}/checklogin`,{user})
            const username = data[0].firstname
            const userid = data[0]._id
            return dispatch({type:CHECK_LOGIN,payload:{user,username,userid}})
        }
    }catch(err){
        console.log('invalid token')
    }
}
export const setChat = payload => async dispatch =>{
    const {data} = await Axios.post(`${baseurl}/getchat`,{
        userid:payload.userid,
        friendid:payload.friendid,
        curChat:payload
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
    localStorage.removeItem("user")
    return dispatch({type:LOGOUT})
}

export const searchFriend = (payload) =>async dispatch=>{
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
    return dispatch({
        type:SET_SOCKET,
        payload
    })
}
export const getRequest = payload =>async dispatch =>{
    const {data} = await Axios.post(`${baseurl}/getrequest`,{_id:payload})
    return dispatch({
        type:GET_REQUEST,
        payload:data
    })
}
export const updateRequest = payload => async dispatch =>{
    return dispatch({
        type:UPDATE_REQUEST,
        payload
    })
}
export const getFriend = userid =>async dispatch =>{
    const {data} = await Axios.post(`${baseurl}/getfriend`,{_id:userid})
    if(data!==null){
        return dispatch({
            type:GET_FRIEND,
            payload:data
        })
    }
}
export const sendRequest = ()=>dispatch=>{
    return dispatch({
        type:SEND_REQUEST
    })
}
export const delChatId = (payload)=>async dispatch=>{
    await Axios.post(`${baseurl}/delchat`,{userid:payload})
    return dispatch({type:DEL_CHAT_ID})
}

export const startVideo = () => dispatch=>{
    return dispatch({type:START_VIDEO})
}