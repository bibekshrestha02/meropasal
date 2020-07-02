import React, { useState, useRef } from "react";
import Title from "./../Assets/Title";
import SubTitle from "./../Assets/subTitle";
import Axios from "../../../Axios";
import Auth from "./../../../classes/Auth";
export default function Password() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [conformPassword, setconformPassword] = useState("");
  const currentPasswordRef = useRef();
  const newPasswordRef = useRef();
  const conformPasswordRef = useRef();
  const [errMessage, setErrMessage] = useState(false);
  const formHandler = (e) => {
    const { value } = e.target;
    const { name } = e.target;
    if (name === "currentPassword") {
      return setCurrentPassword(value);
    } else if (name === "newPassword") {
      return setnewPassword(value);
    } else if (name === "conformPassword") {
      return setconformPassword(value);
    }
  };
  const onUpdate = () => {
    if (!currentPassword) {
      return currentPasswordRef.current.focus();
    } else if (!conformPassword) {
      return conformPasswordRef.current.focus();
    } else if (!newPassword) {
      return newPasswordRef.current.focus();
    } else if (conformPassword !== newPassword) {
      setErrMessage("Password does't matched");
      return conformPasswordRef.current.focus();
    }
    const data = {
      currentPassword,
      newPassword,
      conformPassword,
    };
    setErrMessage(false);
    Axios.patch("/user/", data).then((res) => {
      if (res.data.error) {
        currentPasswordRef.current.focus();
        return setErrMessage(res.data.error);
      }
      const { token } = res.data;
      setErrMessage(false);
      new Auth("", token).updatePassword();
      setconformPassword("");
      setnewPassword("");
      setCurrentPassword("");
      alert("Password Updated");
    });
  };
  return (
    <div>
      <Title title={"Change Password"} />
      <SubTitle de title={"Password"} />
      <div className='mt-lg-3 mt-sm-1'>
        {errMessage && (
          <div className='text-left'>
            <span
              style={{ color: "red", fontWeight: "bold", fontSize: "16px" }}>
              *{errMessage}
            </span>
          </div>
        )}
        <div className='form-group row'>
          <label className='col-sm-2 col-form-label text-lg-right text-sm-left'>
            Current Password
          </label>
          <div className='col-sm-10'>
            <input
              ref={currentPasswordRef}
              name='currentPassword'
              value={currentPassword}
              onChange={formHandler}
              type='password'
              placeholder='Current Password'
              className='form-control'
            />
          </div>
        </div>
        <div className='form-group row'>
          <label className='col-sm-2 col-form-label text-lg-right text-sm-left'>
            New Password
          </label>
          <div className='col-sm-10'>
            <input
              ref={newPasswordRef}
              name='newPassword'
              value={newPassword}
              onChange={formHandler}
              type='password'
              className='form-control'
              placeholder='New Password'
            />
          </div>
        </div>
        <div className='form-group row'>
          <label className='col-sm-2 col-form-label text-lg-right text-sm-left'>
            Conform Password
          </label>
          <div className='col-sm-10'>
            <input
              ref={conformPasswordRef}
              name='conformPassword'
              value={conformPassword}
              onChange={formHandler}
              type='password'
              className='form-control'
              placeholder='Password Confirm'
            />
          </div>
        </div>

        <div className='text-right'>
          <button className='btn btn-danger' onClick={onUpdate}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
