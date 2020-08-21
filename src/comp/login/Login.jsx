import React, { Component } from 'react'
import Axios from 'axios'
import {connect} from 'react-redux'
import { doLogin, checkLogin } from '../../redux/action/action'
import {baseurl} from '../../redux/action/action'

class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             firstname:"",
             lastname:'',
             phoneEmail:'',
             password:'',
             login_phoneEmail:'',
             login_password:'',
             birthday:'',
             gender:''
        }
    }
    componentDidMount(){
        this.props.checkLogin()
    }
    handleLogin = async (e) =>{
        e.preventDefault()
        const {phoneEmail,password} = e.target
        this.props.doLogin({phoneEmail,password})
    }
    handleRegister = async(e) => {
        e.preventDefault()
        const {firstname,lastname,birthday,phoneEmail,password,gender} = e.target
        let firstdata = 'phone'
        let secdata = 'email'
        const testdata = phoneEmail.value.search("@")
        if(testdata !==-1){
            firstdata = 'email'
            secdata = 'phone'
        }
        const {data} = await Axios.post(`${baseurl}/register`,{
            [firstdata]:phoneEmail.value,
            [secdata]:"",
            firstname:firstname.value,
            lastname:lastname.value,
            password:password.value,
            birthday:birthday.value,
            gender:gender.value
        })
        alert("register done")
    }
    render() {
        return (
            <div style={{backgroundColor:"#dfe3ee",height:"100vh"}}>
                <nav className="navbar navbar-dark theme navbar-expand-sm justify-content-between">
        <a className="navbar-brand navBrand" href="/">facebook</a>
        <ul className="navbar-nav">
            <li className="nav-item">
                <form className='form form-inline' onSubmit={this.handleLogin}>
                    <div className="d-block p-0 m-0 pb-4">
                        <p className="p-0 m-0 font_sm text-light">email or phone</p>
                        <input type="text" name="phoneEmail" className="form-control form-control-sm pl-3 mr-2" placeholder="email or phone"/><br/>
                        <p className="p-0 m-0 font_sm"></p>
                    </div>
                    <div className="d-block p-0 m-0">
                        <p className="p-0 m-0 font_sm text-light">password</p>
                        <input type="password" name="password" className="form-control form-control-sm pl-3 mr-2" placeholder="password"/><br/>
                        <p className="m-0 p-0 font_sm text-light">forgot password</p>
                    </div>
                    <button type="submit" className="btn btn-dark btn-sm rounded-0">Login</button>
                </form>
            </li>
        </ul>
    </nav>

    <div className="col-12 row m-auto">
        <div className="col-7 text-right justify-content-right pt-4" style={{height:"200px"}}>
            <div className="col-9 ml-auto">
                <h5 className="text-left">Facebook helps you connect and share with the people in your life.</h5>
            <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yi/r/OBaVg52wtTZ.png" alt="img" className="img-fluid"/>
            </div>
        </div>
        <div className="col-3 pt-4">
            <h4>Create an account</h4>
            <p>it's quick and easy</p>
<form className='form col-12 p-0' onSubmit={this.handleRegister}>
    <div className="row justify-content-between p-0">
        <div className="pr-1 pl-0 mb-1 col-6">
            <input type="text" name="firstname" className="form-control form-control-sm col-12" placeholder="firstname"/>
        </div>
        <div className="pr-1 pl-0 mb-1 col-6">
            <input type="text" name="lastname" className="form-control form-control-sm col-12" placeholder="lastname"/>
        </div>
        <div className="pr-1 pl-0 mb-1 col-12">
            <input type="text" name="phoneEmail" className="form-control form-control-sm col-12" placeholder="phone or email"/>
        </div>
        <div className="pr-1 pl-0 mb-1 col-12">
            <input type="text" name="password" className="form-control form-control-sm col-12" placeholder="password"/>
        </div>
        <div className="col-12 pr-1 pl-0 mb-1">
            <input type='date' className="form-control form-control-sm" id='datetimepicker4' placeholder="enter date" name='birthday'  />
        </div>
        <div className='col-12 pr-1 mb-1 pl-0'>
            <p>Gender</p>
        <div className="form-check-inline">
            <label className="form-check-label">
            <input type="radio" className="form-check-input" name="gender" value='male'/>Male
            </label>
            </div>
            <div className="form-check-inline">
            <label className="form-check-label">
            <input type="radio" className="form-check-input" value='female' name="gender"/>Female
            </label>
            </div>
            <div className="form-check-inline disabled">
            <label className="form-check-label">
            <input type="radio" className="form-check-input" value='other' name="gender"/>Other
            </label>
            </div>
        </div>
        <button type='submit' className='btn btn-success form-control'>Sign Up</button>
    </div>
</form>
        </div>
    </div>
            </div>
        )
    }
}

const mapStateToProps = state =>{return {...state}}
const mapDispatchToProps = dispatch =>{
    return {
        doLogin:payload=>dispatch(doLogin(payload)),
        checkLogin:()=>dispatch(checkLogin())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login)
