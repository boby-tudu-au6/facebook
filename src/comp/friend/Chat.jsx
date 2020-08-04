import React, { Component } from 'react'

export class Chat extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             message:""
        }
    }
    
    render() {
        return (
            <div>
                <div className='row container p-0 m-auto col-12 text-center justify-content-center'>
                    <div className='col-4 full pt-3 scroll' style={{height:"78vh"}}>
                        <div className='card pt-0 pb-0 pl-3 pr-3 mb-2'>
                            <div className='row'>
                                <img src="https://www.w3schools.com/bootstrap4/img_avatar3.png" alt="img" className="col-2 rounded-circle p-2"/>
                                <div className='col-9 pt-3 text-left'>
                                    <h3 className='lightfont'>Boby tudu</h3>
                                </div>
                            </div>
                        </div>

                        <div className='card pt-0 pb-0 pl-3 pr-3 mb-2'>
                            <div className='row'>
                                <img src="https://www.w3schools.com/bootstrap4/img_avatar3.png" alt="img" className="col-2 rounded-circle p-2"/>
                                <div className='col-9 pt-3 text-left'>
                                    <h3 className='lightfont'>Boby tudu</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* chat window */}
<div className='col-8 p-0 full' style={{backgroundImage:'url("https://cdn.hipwallpaper.com/m/60/39/9vsJ5D.png")'}}>
    <div className='container col-12 pl-3 pr-3 pt-3 messageBox'>
        <div className='text-left'>
                <p className='text-left text-dark mb-1 p-2 rounded-right rounded-bottom shadow bg-light d-inline-block'>Hello boby</p>
        </div>
        <div className='text-right'>
            <p className='text-left text-dark mb-1 p-2 rounded-left rounded-bottom shadow bg-light d-inline-block'>Hello boby</p>
        </div>
        
        <div className='text-right'>
            <p className='text-left text-dark mb-1 p-2 rounded-left rounded-bottom shadow bg-light d-inline-block'>Hello boby</p>
        </div>
    </div>
    <form class='form form-inline col-12 pl-1 pr-1 pt-2 pb-2 darkgray'>
        <div className='col-1 p-0 pt-2 pb-2 rounded emoji_box'>
            <i class="far fa-smile icon"></i>
        </div>
        <input type="text" name="chat_message" className='form-control col-10 rounded-pill border-0' placeholder='enter message'/>
    </form>
</div>
    </div>
</div>
        )
    }
}

export default Chat
