import React, { useEffect, useState, useRef } from "react";
import "./Otp.css";
import CloseIcon from "@material-ui/icons/Close";
import Axios from "axios";
import Modal from "react-modal";
import Step3ResetUser from "./Step3ResetUser";
import { ToastContainer, toast } from "react-toastify";
import OtpInput from "react-otp-input";
import "react-toastify/dist/ReactToastify.css";
import { LoadingOutlined } from "@ant-design/icons";
const spinIcon  = <LoadingOutlined style={{ fontSize: 24 }} spin />;
let API = "http://localhost:8080/register/verifyOtp"
toast.configure();
function OtpUser({ data ,step1,step2,step3}) {
  let [modelIsOpen, setModelIsOpen] = useState(false);
  let [otp, setOtp] = useState("");
  const [error,setError] = useState('')
  const [spin, setSpin] = useState(false);
  console.log(otp);
  function findText(e) {
    setOtp(e.target.value);
  }

  const handleSpin = (e) => {
    e.preventDefault();
    setSpin(true);
    handleSubmit()
    
  
  };
  async function handleSubmit() {


    setOtp('')
    let final = parseInt(otp);
    localStorage.setItem("otp", final);
    let URL = "";
    if (localStorage.getItem("phone") !== "") {
      URL = `https://whispering-lake-75400.herokuapp.com/Register/resetpass/u/verify?type=mobile&mobile_no=${localStorage.getItem(
        "phone"
      )}&otp=${final}`;
    }
    else{
      URL = `${API}/?email=${localStorage.getItem(
        "email"
      )}&vCode=${final}`;
    }
    console.log(URL);
    try {
      let Mobile = await Axios({
        method: "post",
        url: URL,
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setSpin(false)
    
      setError(Mobile.data.message);
      step1(false)
        step2(false)
        step3(true)
    
      // notify(Mobile.data.err)
     
    } catch (err) {
      setError(err.response.statusText)
  
      console.log(err);
    }
  }



  const notify = (m) => {
    toast.success(m, {
      draggable: true,
      position: toast.POSITION.TOP_CENTER,
      style: { textTransform: "uppercase" },
    });
  };
  const notify1 = (m) => {
    toast.error(m, { position: toast.POSITION.TOP_CENTER });
  };

  let handleChange = (otp) => setOtp(otp);

  return (
    <>
      <ToastContainer />
      <div id="wrapper1">
        <div id="dialog">
          <h5>Please enter the 5-digit verification code we sent via SMS:</h5>
          <div id="form">
            <div      >
              <OtpInput
                value={otp}
                onChange={handleChange}
                numInputs={5}
                separator={<span>-</span>}
              />
               {error !== '' ? <span  className="errorMessage">{error}</span> : null}

              <button
              
                onClick={handleSpin}
                class="btn btn-primary btn-embossed"
              >
                  {spin === true ? spinIcon :  "VERIFY"}
              </button>
            </div>
          </div>

          {/* <div id="form">
            <button
              class="btn btn-primary btn-embossed mt-0"
              onClick={() => {
                setModelIsOpen(true);
              }}
            >
              Enter New Password
            </button>
          </div> */}
        </div>

        <Modal
          className="Modal"
          isOpen={modelIsOpen}
          onRequestClose={() => {
            setModelIsOpen(false);
          }}
        >
          <button
            style={{
              background: "transparent",
              width: "20px",
              marginLeft: "200px",
              outline: "none",
            }}
            onClick={() => {
              setModelIsOpen(false);
            }}
          >
            <CloseIcon style={{ marginLeft: "500px" }} />{" "}
          </button>
          <Step3ResetUser />
        </Modal>
      </div>
      <ToastContainer />
    </>
  );
}

export default OtpUser;









// function handleEnter(event) {
//   num1Ref.current.focus();
//   if (
//     event.keyCode === 96 ||
//     97 ||
//     98 ||
//     98 ||
//     99 ||
//     99 ||
//     100 ||
//     101 ||
//     102 ||
//     103 ||
//     104 ||
//     105
//   ) {
//     const form = event.target.form;
//     const index = Array.prototype.indexOf.call(form, event.target);
//     form.elements[index + 1].focus();
//     event.preventDefault();
//   }
// }