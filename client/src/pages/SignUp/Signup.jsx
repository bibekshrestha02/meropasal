import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import LogInTitle from "./../../Assets/LogInTitle";
import Validator from "validator";
import style from "./signUp css/style.module.scss";
import Auth from "./../../classes/Auth";
import Axios from "./../../Axios";
export default function Signup(props) {
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [conformPassword, setconformPassword] = useState("");
  const [gender, setgender] = useState("Male");
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [isErr, setErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const emailRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  const formHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name === "fname") {
      return setfname(value);
    } else if (name === "lname") {
      return setlname(value);
    } else if (name === "email") {
      return setEmail(value);
    } else if (name === "password") {
      return setPassword(value);
    } else if (name === "conform-password") {
      return setconformPassword(value);
    } else if (name === "gender") {
      return setgender(value);
    }
  };
  const signUpfn = () => {
    if (!fname || !lname) {
      nameRef.current.focus();
      setErr(true);
      return setErrMessage(" Please Fill the form");
    } else if (!email) {
      emailRef.current.focus();
      setErr(true);
      return setErrMessage(" Please Fill the form");
    } else if (!Password || !conformPassword) {
      passwordRef.current.focus();
      setErr(true);
      return setErrMessage(" Please Fill the form");
    } else if (!Validator.isEmail(email)) {
      emailRef.current.focus();
      setErr(true);
      return setErrMessage("Invalid Email");
    } else if (Password !== conformPassword) {
      setErr(true);
      passwordRef.current.focus();
      return setErrMessage("Password doesn't matched");
    }
    const data = {
      email: email,
      fname: fname,
      lname: lname,
      password: Password,
      conformPassword: conformPassword,
      gender: gender,
    };
    Axios.post("/user/signup", data).then((res) => {
      if (!res.data.status) {
        setErr(true);
        emailRef.current.focus();
        return setErrMessage("Email already Exists");
      }
      setErr(false);
      setErrMessage("");
      const token = res.data.token;
      const obj = new Auth(props.history, token);
      obj.login();
      setErr(false);
      setErrMessage("");
    });
  };
  return (
    <div className={style.loginform}>
      <form>
        <LogInTitle Title='SignUp' />
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
            value={fname}
            type='text'
            name='fname'
            ref={nameRef}
            className='form-control'
            placeholder='First Name'
            required='required'
          />
        </div>
        <div className='form-group '>
          <input
            onChange={formHandler}
            value={lname}
            type='text'
            name='lname'
            className='form-control'
            placeholder='Last Name'
            required='required'
          />
        </div>
        <div className='form-group '>
          <input
            onChange={formHandler}
            value={email}
            type='text'
            name='email'
            ref={emailRef}
            className='form-control'
            placeholder='Email'
            required='required'
          />
        </div>
        <div className='form-group'>
          <input
            onChange={formHandler}
            value={Password}
            type='password'
            ref={passwordRef}
            name='password'
            className='form-control'
            placeholder='Password'
            required='required'
          />
        </div>
        <div className='form-group'>
          <input
            onChange={formHandler}
            value={conformPassword}
            type='password'
            ref={passwordRef}
            name='conform-password'
            className='form-control'
            placeholder='Conform Password'
            required='required'
          />
        </div>
        <div className='form-group'>
          <select
            className='form-control'
            name='gender'
            onChange={formHandler}
            value={gender}>
            <option value='Male'>Male</option>
            <option value='fMale'>Fe-Male</option>
          </select>
        </div>

        <div className='form-group'>
          <button
            type='button'
            className='btn btn-danger btn-block '
            onClick={signUpfn}>
            SignUp
          </button>
        </div>
        <div className='text-center'>
          <span>
            Have an account?
            <Link to='/login'>
              <span className={style.registar}> Login</span>
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}
