import React, { Component } from 'react'
import FirstColumn from './FirstColumn'
import SecondColumn from './SecondColumn'
import ThirdColumn from './ThirdColumn'
import withState from '../hoc/withState'

class Home extends Component {
    render() {
        return (   
    <div>
        {this.props.user===null?null:(
            <div className="container row col-12 m-auto pt-4">
                <FirstColumn/>
                <SecondColumn/>
                <ThirdColumn/>
            </div>
        )}
    </div>
        )
    }
}
export default withState(Home)
