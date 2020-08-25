import React from "react";
import "./Forgot.css";
import Axios from 'axios'
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoadingOutlined } from "@ant-design/icons";
const spinIcon  = <LoadingOutlined style={{ fontSize: 24 }} spin />;
let API = 'http://localhost:8080/register/newpass'
toast.configure()
function Step3ResetInt(props) {
    let [password,setPassword] = useState('')
    let [fPassword,setFPassword] = useState('')
    const [spin, setSpin] = useState(false);
    const  notify = (m)=>{
    
      toast.success(m,{draggable: true,position:toast.POSITION.TOP_CENTER,style:{textTransform:"uppercase"}});
    } 
    const  notify1 = (m)=>{
      
      toast.error(m,{position:toast.POSITION.TOP_CENTER});
    } 
    function handleChange(e){
        let {name,value}= e.target
        setPassword(value)
    }
    function handleChange1(e){
        let {name,value}= e.target
        setFPassword(value)
    }
    async  function handleSubmit(){
      
         console.log(password,fPassword)
        let URL = '';
        if(localStorage.getItem('email')!== null){
            URL = `${API}?email=${localStorage.getItem('email')}`
            console.log(URL)
        }else{
            URL =`https://whispering-lake-75400.herokuapp.com/Register/resetpass/u/change?mobile_no=${localStorage.getItem('phone')}&otp=${localStorage.getItem('otp')}`
        }
        console.log(URL)
       let pass = password.toString()
       console.log((pass))
       try {
        let Mobile = await Axios({
          method: "patch",
          url: URL,
          data:{
              password:pass
          }
        });

        // props.modelOpen
        
        notify(Mobile.data.message)
        notify1(Mobile.data.err)
        setSpin(false)
           localStorage.removeItem('phone')
           localStorage.removeItem('email')
           localStorage.removeItem('otp')
           localStorage.setItem('status','resetpassword')
          
      } catch (err) {
        notify1('Confirm Your Email or Mobile First')
        setSpin(false)
        console.log(err);
      }
    }
    
  const handleSpin = (e) => {
    e.preventDefault();
    setSpin(true);
    handleSubmit()
    
  
  };
  return (
    <>
      <div id="rowF">
        <h3>Reset Password</h3>
        <div>
        <h5>Please Enter Your New Password</h5>
        </div>

        <hr />
        <div>
          <label id="labelp" htmlFor="input">
            New Password
          </label>
          <input
            required="true"
            placeholder="Enter New Password"
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <div>
          {" "}
          <label htmlFor="input">Confirm Password</label>
          <input
            required="true"
            placeholder="Enter New Password"
            name="fpassword"
            type="password"
            value={fPassword}
            onChange={handleChange1}
          />
          <button
            className="ml-5"
            onClick={handleSpin}
            style={{ marginBottom: "3rem" }}
          >
             {spin === true ? spinIcon :  "RESET PASSWORD"}
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Step3ResetInt;
