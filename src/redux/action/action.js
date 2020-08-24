import Axios from "axios"

export const DO_LOGIN = 'DO_LOGIN'
export const CHECK_LOGIN = 'CHECK_LOGIN'
export const LOGOUT = 'LOGOUT'
export const SEARCH_FRIEND = 'SEARCH_FRIEND'
export const SEND_REQUEST = 'SEND_REQUEST'
export const UPDATE_REQUEST = 'UPDATE_REQUEST'
export const START_VIDEO = 'START_VIDEO'
export const START_AUDIO = 'START_AUDIO'
export const GET_REQUEST = 'GET_REQUEST'
export const GET_NOTIFICATION = 'GET_NOTIFICATION'
export const GET_FRIEND = 'GET_FRIEND'
export const GET_POST = 'GET_POST'
export const GET_PROFILE = 'GET_PROFILE'
export const SET_SOCKET = 'SET_SOCKET'
export const SET_CHAT = 'SET_CHAT'
export const SET_ONLINE_CHAT = 'SET_ONLINE_CHAT'
export const SET_UNREAD = 'SET_UNREAD'
export const SET_FILE = 'SET_FILE'
export const SET_FILESRC = 'SET_FILESRC'
export const SET_PAGEID = 'SET_PAGEID'
export const INC_UNSEEN_POST = 'INC_UNSEEN_POST'
export const DEL_UNSEEN_POST = 'DEL_UNSEEN_POST'
export const DEL_CHAT_ID = 'DEL_CHAT_ID'
export const DEL_FILES = 'DEL_FILES'
export const DEL_FILE_ITEM = 'DEL_FILE_ITEM'
export const DEL_PROFILE = 'DEL_PROFILE'
export const DIS_SET_CHAT = 'DIS_SET_CHAT'




export const baseurl = "http://localhost:8080"

export const getProfile = payload =>async dispatch=>{
    const {data} = await Axios.post(`${baseurl}/getprofile`,{userid:payload})
    return dispatch({
        type:GET_PROFILE,
        payload:data
    })
}

export const delProfile = () =>dispatch=>{
    return dispatch({type:DEL_PROFILE})
}
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
            const profilePic = data[0].profilePic
            const coverImg = data[0].coverImg
            return dispatch({type:CHECK_LOGIN,payload:{
                user,username,userid,profilePic,coverImg
            }})
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
export const startAudio = () =>dispatch=>{
    return dispatch({type:START_AUDIO})
}
export const getPost = ({userid,page}) => async dispatch =>{
    const {data} = await Axios.post(`${baseurl}/getpost`,{userid,page})
    return dispatch({
        type:GET_POST,
        payload:data
    })
}
export const incUnseenPost = () =>dispatch=>{
    return dispatch({type:INC_UNSEEN_POST})
}
export const delUnseenPost = () =>dispatch=>{
    return dispatch({type:DEL_UNSEEN_POST})
}
export const setFile = payload =>dispatch =>{
    return dispatch({type:SET_FILE,payload})
}
export const setFileSrc = payload =>dispatch =>{
    return dispatch({type:SET_FILESRC,payload})
}
export const delFiles = ()=>dispatch=>{
    return dispatch({type:DEL_FILES})
}
export const delFileItem = payload=>dispatch=>{
    return dispatch({type:DEL_FILE_ITEM,payload})
}
export const setPageId = payload=>dispatch=>{
    return dispatch({type:SET_PAGEID,payload})
}
export const disSetChat = () =>dispatch=>{
    return dispatch({type:DIS_SET_CHAT})
}