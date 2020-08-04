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

export const doLogin = ({phoneEmail,password}) => async dispatch =>{
    let firstdata = 'phone';
        const testdata = phoneEmail.value.search("@")
        if(testdata!==-1){
            firstdata = 'email'
        }
        const {data} = await Axios.post('https://s2d4h.sse.codesandbox.io/login',{
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
    const user = localStorage.getItem('user')
    const username = localStorage.getItem("username")
    if(user){
        return dispatch({type:CHECK_LOGIN,payload:{user,username}})
    }
}
export const logout = ()=>dispatch=>{
    localStorage.removeItem("user")
    localStorage.removeItem("username")
    return dispatch({type:LOGOUT})
}

export const searchFriend = (payload) =>async dispatch=>{
    if(payload!==""){
        const {data} = await Axios.post("https://s2d4h.sse.codesandbox.io/search",{q:payload})
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
    // alert("get request called")
    const {data} = await Axios.post("https://s2d4h.sse.codesandbox.io/getrequest",{_id:payload})
    return dispatch({
        type:GET_REQUEST,
        payload:data
    })
}
export const updateRequest = payload => async dispatch =>{
    alert("update request called")
    console.log(payload)
    return dispatch({
        type:UPDATE_REQUEST,
        payload
    })
}