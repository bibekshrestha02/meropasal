import React, { useState, useEffect, useRef } from "react";
import LogInTitle from "../../Assets/LogInTitle";
import { Link, withRouter } from "react-router-dom";
import style from "./Login css/style.module.scss";
import Auth from "../../classes/Auth";
import Axios from "./../../Axios";
import Validator from "validator";
function Login(props) {
  const [isErr, setErr] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();

  const formHandler = (e) => {
    const value = e.target.value;
    if (e.target.name === "email") {
      return setEmail(value);
    } else if (e.target.name === "password") {
      return setPassword(value);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  const getLogin = () => {
    if (!email) {
      emailRef.current.focus();
      setErrMessage("Enter Email or Password");
      return setErr(true);
    }
    if (!password) {
      passwordRef.current.focus();
      setErrMessage("Enter Email or Password");
      return setErr(true);
    }
    if (!Validator.isEmail(email)) {
      emailRef.current.focus();
      setErrMessage("Invalid Email");
      return setErr(true);
    }
    const data = {
      email: email,
      password: password,
    };
    Axios.post("/user/login", data)
      .then((res) => {
        const token = res.data.token;
        const obj = new Auth(props.history, token);
        obj.login();
        setErr(false);
      })
      .catch((err) => {
        passwordRef.current.focus();
        setErrMessage("Invalid Email or Password");
        setErr(true);
      });
  };

  return (
    <div className='pt-5'>
      <div className={style.loginform}>
        <form>
          <LogInTitle Title='Login' />
          {isErr ? (
            <span
              style={{
                color: "black",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "12px",
              }}>
              * {errMessage}
            </span>
          ) : null}
          <div className='form-group '>
            <input
              onChange={formHandler}
              value={email}
              ref={emailRef}
              type='text'
              name='email'
              className={`form-control`}
              placeholder='Email'
              required='required'
            />
          </div>
          <div className='form-group'>
            <input
              ref={passwordRef}
              onChange={formHandler}
              value={password}
              type='password'
              name='password'
              className='form-control'
              placeholder='Password'
              required='required'
            />
          </div>
          <div className='form-group'>
            <button
              type='button'
              className='btn btn-danger btn-block '
              onClick={getLogin}>
              Log in
            </button>
          </div>
          <div className='text-center'>
            <span>
              Don't have an account?
              <Link to='/signup'>
                <span className={style.registar}> Register Here</span>
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default withRouter(Login);
