import React, { Component } from 'react'
import FirstColumn from './FirstColumn'
import SecondColumn from './SecondColumn'
import ThirdColumn from './ThirdColumn'
import withState from '../hoc/withState'
import RefreshBtn from './RefreshBtn'

class Home extends Component {
    render() {
        return (   
    <div>
        {this.props.userid===null?null:(
            <div className="container row col-12 m-auto pt-4">
                <FirstColumn/>
                <SecondColumn/>
                <ThirdColumn/>
                    {this.props.unseenpost!==0?(
                        <RefreshBtn/>
                    ):null}
            </div>
        )}
    </div>
        )
    }
}
export default withState(Home)
