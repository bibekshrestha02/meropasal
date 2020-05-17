import React, { useState, useEffect } from "react";
import LogInTitle from "../../Assets/LogInTitle";
import { Link, withRouter } from "react-router-dom";
import "./Login css/style.css";
import Auth from "../../classes/Auth";
import Axios from "./../../Axios";
// import { Redirect } from "react-router-dom";
function Login(props) {
  const [err, setErr] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  const login = () => {
    if (!email || !password) {
      setErrMessage("*Enter Email or Password");
      return setErr(true);
    }
    const data = {
      email: email,
      password: password,
    };
    Axios.post("/user/login", data)
      .then((res) => {
        // console.log(res);
        const token = res.data.token;
        // console.log(token);
        const obj = new Auth(props.history, token);
        obj.login();
        setErr(false);
      })
      .catch((err) => {
        setErrMessage("*Invalid Email or Password");
        setErr(true);
      });
  };

  return (
    <div>
      <div className='Login border mt-3 mb-3 mx-auto '>
        <LogInTitle Title='Login or Create an Account' />
        <form className='pl-4 pr-4 mt-3'>
          {err ? (
            <div className='text-center'>
              <span style={{ color: "Red" }}>{errMessage}</span>
            </div>
          ) : null}

          <span>
            Email Address<span className='star'>*</span>
            <br />
          </span>
          <input type='email' required value={email} onChange={emailHandler} />
          <br />
          <span>
            Password<span className='star'>*</span>
          </span>
          <br />
          <input type='password' value={password} onChange={passwordHandler} />
          <br />

          <div className=' mt-2 text-left'>
            <span className='starTitle text-primary'>
              Forget your Password?
            </span>
          </div>
          <span className='btn btn-block btn-danger ' onClick={login}>
            LOGIN
          </span>
          <div className='text-center Or text-center '>
            <b>OR</b>
          </div>
          <Link className='link' to='/SignUp'>
            <button className='btn btn-warning btn-block'>
              Create an Account
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default withRouter(Login);
