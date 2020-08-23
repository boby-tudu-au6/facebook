import React from 'react'
import {connect} from 'react-redux'
import { getFriend, setChat, logout, searchFriend,searchFriend1, setSocket, getRequest, updateRequest, sendRequest, setOnlineChat, delChatId, checkLogin, startVideo,getPost } from '../../redux/action/action'

function withState(Component) {
    const mapStateToProps = state =>{return {...state}}
    const mapDispatchToProps = dispatch =>{
        return {
            checkLogin:()=>dispatch(checkLogin()),
            getFriend:payload=>dispatch(getFriend(payload)),
            sendRequest:()=>dispatch(sendRequest()),
            logout:()=>dispatch(logout()),
            setChat:payload=>dispatch(setChat(payload)),
            searchFriend:payload=>dispatch(searchFriend(payload)),
            searchFriend1:payload=>dispatch(searchFriend1(payload)),
            setSocket:payload=>dispatch(setSocket(payload)),
            getRequest:payload=>dispatch(getRequest(payload)),
            updateRequest:payload=>dispatch(updateRequest(payload)),
            setOnlineChat:payload=>dispatch(setOnlineChat(payload)),
            delChatId:payload=>dispatch(delChatId(payload)),
            startVideo:()=>dispatch(startVideo),
            getPost:payload=>dispatch(getPost(payload))
        }
    }
    return connect(mapStateToProps,mapDispatchToProps)(
        class extends React.Component{
            componentDidMount(){
                // this.props.checkLogin()
            }
            render(){
                return (
                <Component
                    checkLogin={this.props.checkLogin}
                    startVideo={this.props.startVideo}
                    messages={this.props.messages}
                    searchResult={this.props.searchResult}
                    searchResult1={this.props.searchResult1}
                    friendRequest={this.props.friendRequest}
                    getRequest={this.props.getRequest}
                    getFriend={this.props.getFriend}
                    sendRequest={this.props.sendRequest}
                    logout={this.props.logout}
                    setChat={this.props.setChat}
                    searchFriend={this.props.searchFriend}
                    searchFriend1={this.props.searchFriend1}
                    setSocket={this.props.setSocket}
                    updateRequest={this.props.updateRequest}
                    setOnlineChat={this.props.setOnlineChat}
                    delChatId={this.props.delChatId}
                    socket={this.props.socket}
                    userid={this.props.userid}
                    curChat={this.props.curChat}
                    username={this.props.username}
                    loggedIn={this.props.loggedIn}
                    notification={this.props.notification}
                    friend={this.props.friend}
                    friendId={this.props.friendId}
                    unreadeChat={this.props.unreadeChat}
                    video={this.props.video}
                    getPost={this.props.getPost}
                />)
            }
        }
    )
}

export default withState
