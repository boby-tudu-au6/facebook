import React, { Component } from 'react'
import FirstColumn from './FirstColumn'
import SecondColumn from './SecondColumn'
import ThirdColumn from './ThirdColumn'
import { connect } from 'react-redux'

class Home extends Component {
    render() {
        return (   
<div>
        {this.props.user===null?null:(
    <div class="container row col-12 m-auto pt-4">
        <FirstColumn/>
        <SecondColumn/>
        <ThirdColumn/>
    </div>
)}
</div>
        )
    }
}
const mapStateToProps = state =>{return {...state}}
export default connect(mapStateToProps)(Home)
