import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LogInTitle from "./../../Assets/LogInTitle";
import Validator from "validator";
import "./signUp css/style.css";
import Auth from "./../../classes/Auth";
import Axios from "./../../Axios";
export default function Signup(props) {
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [conformPassword, setconformPassword] = useState("");
  const [gender, setgender] = useState("fMale");
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [err, setErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const fnameHandler = (e) => {
    setfname(e.target.value);
  };
  const lnameHandler = (e) => {
    setlname(e.target.value);
  };
  const genderHandler = (e) => {
    setgender(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const conformPasswordHandler = (e) => {
    setconformPassword(e.target.value);
  };
  const signUpfn = () => {
    if (
      !email ||
      !Password ||
      !conformPassword ||
      !gender ||
      !fname ||
      !lname
    ) {
      setErr(true);
      return setErrMessage("* Please Fill the form");
    } else if (!Validator.isEmail(email)) {
      setErr(true);
      return setErrMessage("*Invalid Email");
    } else if (Password !== conformPassword) {
      setErr(true);
      return setErrMessage("*Password doesn't matched");
    } else if (Password.length < 8) {
      setErr(true);
      return setErrMessage("*Password should be at least 8 characters");
    }
    const data = {
      email: email,
      fname: fname,
      lname: lname,
      password: Password,
      conformPassword: conformPassword,
      gender: gender,
    };
    Axios.post("/user/signup", data)
      .then((res) => {
        console.log(res);
        if (!res.data.status) {
          setErr(true);
          return setErrMessage("*Email already Exists");
        }
        const token = res.data.token;
        const obj = new Auth(props.history, token);
        obj.login();
        setErr(false);
        setErrMessage("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div className='SignUp border mt-2 mx-auto'>
        <form className='m-3'>
          {err ? (
            <div className='text-center'>
              <span style={{ color: "Red" }}>{errMessage}</span>
            </div>
          ) : null}
          <LogInTitle Title='Create an Account' />
          <span>
            Fname<span className='star'>*</span>
          </span>
          <br />
          <input
            type='text'
            name='fname'
            onChange={fnameHandler}
            value={fname}
          />
          <br />
          <span>
            Lname<span className='star'>*</span>
          </span>
          <br />
          <input
            type='text'
            name='Lname'
            onChange={lnameHandler}
            value={lname}
          />
          <br />
          <span>
            Email<span className='star'>*</span>
          </span>
          <br />
          <input
            type='email'
            onChange={emailHandler}
            name='Email'
            value={email}
          />
          <br />
          <span>
            Password<span className='star'>*</span>
          </span>
          <br />
          <input
            type='password'
            onChange={passwordHandler}
            name='password'
            value={Password}
          />
          <br />
          <span>
            Confrom Password<span className='star'>*</span>
          </span>
          <br />
          <input
            type='password'
            onChange={conformPasswordHandler}
            name='password'
            value={conformPassword}
          />
          <br />
          <span>
            Gender<span className='star'>*</span>
          </span>
          <br />
          <select name='Gender' onChange={genderHandler} value={gender}>
            <option value='Male'>Male</option>
            <option value='fMale'>Fe-Male</option>
            {/* <option value='Other'>Other</option> */}
          </select>
          <input
            type='button'
            className='btn btn-danger btn-block'
            onClick={signUpfn}
            value='SIGNUP'
          />
          <div className='Or text-center'>OR</div>
          <Link className='link' to='Login'>
            <input
              type='button'
              className='btn btn-warning btn-block'
              value='LOGIN'
            />
          </Link>
        </form>
      </div>
    </div>
  );
}
