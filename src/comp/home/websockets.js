function websocket (
    socket,
    setSocket,
    userid,
    getFriend,
    getRequest,
    location,
    curChat,
    setOnlineChat
){
    socket.on("connect",()=>{
        setSocket(socket)
        socket.emit("updatesocketid",{userid})
        getFriend()
    })

    socket.on('requestCreated',data=>{
        if(data.to===userid){
            getRequest(userid)
        }
    })

    socket.on('deletedRequest',data=>{
        getRequest(userid)
    })

    socket.on("requestAccepted",data=>{
        if(data.data.to===userid || data.data.from._id === userid){
            getRequest(userid)
            getFriend()
        }
    })

    socket.on("imonline",data=>{
        setTimeout(()=>getFriend(),2000)
    })

    socket.on("userDisconnected",data=>{
        getFriend()
    })

    socket.on("chat",data=>{
        if(curChat!==null && location==='/messages'){
            if(data.to===userid || data.from===userid){
                if(data.to===userid){
                    socket.emit('chatRead',data)
                    return setOnlineChat({...data,unread:"false"})
                }else if (data.from===userid){
                    setOnlineChat(data)
                }
            }else if(curChat===null || location!=='/messages'){
                if(data.to===userid)setOnlineChat(data)
            }
        }
    })
}

export default websocket