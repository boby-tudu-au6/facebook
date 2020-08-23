export const websocket = {
    connect:(
        socket,
        setSocket,
        userid,
        getFriend
    )=>{
        setSocket(socket)
        socket.emit("updatesocketid",{userid})
        getFriend(userid)
    },
    chat:(data,
        socket,
        location,
        curChat,
        userid,
        setOnlineChat
        )=>{
            if(curChat!==null && location==='/messages'){
                if(data.to===userid){
                    socket.emit('chatRead',data)
                    return setOnlineChat({...data,unread:"false"})
                }else if(data.from===userid){
                    setOnlineChat(data)
                }
            }else if(curChat===null || location!=="/messages"){
                if(data.to===userid){setOnlineChat(data)}
            }
    },
    requestAccepted:(
        data,
        userid,
        getRequest,
        getFriend)=>{
            if(data.data.to===userid || data.data.from._id===userid){
                getRequest(userid)
                getFriend(userid)
            }
    }
}


// export default websocket