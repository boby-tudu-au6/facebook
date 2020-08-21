import React, { Component } from 'react'
import CreatePost from './CreatePost'
import RegularPost from './RegularPost'
import withState from '../hoc/withState'

import Pagination from 'react-responsive-pagination';


class SecondColumn extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             current:1
        }
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
            <div className='col-6 p-0'>
                <div className="col-12 secCol m-0 p-0">
                <CreatePost/>
                {this.props.post!==null?this.props.post.data.map(item=>
                <RegularPost 
                key={Math.random()} 
                data={item} 
                userid={this.props.userid}
                friends={friends} 
                socket={this.props.socket}/>)
                :null}
            </div>
            <div className='m-2'></div>
            <Pagination
            current={this.state.current}
            total={totalPages}
            onPageChange={(e)=>{this.handleChange(e)
            }}/>
            </div>
        )
    }
}

export default withState(SecondColumn)
