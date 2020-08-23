import React, { Component } from 'react'
import CreatePost from './CreatePost'
import RegularPost from './RegularPost'
import withState from '../hoc/withState'
import {withRouter} from 'react-router-dom'

import Pagination from 'react-responsive-pagination';


class SecondColumn extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             current:1
        }
    }
    componentDidMount(){
        console.log(this.props.location.pathname)
    }
    handleChange=(e)=>{
        this.props.setPageId(e)
        this.props.getPost({userid:this.props.userid,page:e})
        this.setState({current:e})
    }
    render() {
        let totalPages=0
        if(this.props.post!==null){
            let pol = this.props.post.length
            if(pol%5!==0){
                totalPages=parseInt((pol/5)+1)
            }else{
                totalPages=parseInt(pol/5)
            }
        }
        let friends = [];
        if(this.props.friend!==null){
            this.props.friend.forEach(item=>friends.push(item.friendId))
        }
        return (
            <div className='col-12 p-0'>
                <div className="col-12 secCol m-0 p-0">
                    {this.props.location.pathname==='/profile'?null:<CreatePost/>}
                
                {this.props.post!==null?this.props.post.data.length===0?
                <div className='bg-light hid rounded mt-2' 
                style={{height:"200px",paddingTop:"50px"}}>
                    <h1>nothing here</h1>
                </div>
                :this.props.post.data.map(item=>
                        <RegularPost 
                        key={Math.random()} 
                        data={item} 
                        userid={this.props.userid}
                        friends={friends} 
                        socket={this.props.socket}/>)
                    :null}
            </div>
            <div className='m-2'></div>
            {totalPages>1?<Pagination
            current={this.state.current}
            total={totalPages}
            onPageChange={(e)=>{this.handleChange(e)
            }}/>:null}
            </div>
        )
    }
}

export default withState(withRouter(SecondColumn))
