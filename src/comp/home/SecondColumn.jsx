import React, { Component } from 'react'
import CreatePost from './CreatePost'
import RegularPost from './RegularPost'

export default class SecondColumn extends Component {
    render() {
        return (
            <div class="col-6 full">
                <CreatePost/>
                <RegularPost/>
                <RegularPost/>
                <RegularPost/>
            </div>
        )
    }
}
