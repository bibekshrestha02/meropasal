import React, { useState, useEffect, useRef } from "react";
import Title from "./../Assets/Title";
import SubTitle from "./../Assets/subTitle";
import Axios from "./../../../Axios";
export default function Account(props) {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const fnameRef = useRef();
  const LnameRef = useRef();

  useEffect(() => {
    Axios.get("/user/").then((res) => {
      const { data } = res;
      setFname(data.fname);
      setLname(data.lname);
      setEmail(data.email);
    });
  }, []);
  const formHandler = (e) => {
    const { value } = e.target;
    const { name } = e.target;
    if (name === "fname") {
      return setFname(value);
    } else if (name === "lname") {
      return setLname(value);
    }
  };
  const onClickUpdateForm = () => {
    if (!fname) {
      return fnameRef.current.focus();
    }
    if (!lname) {
      return LnameRef.current.focus();
    }
    const data = {
      fname,
      lname,
    };
    Axios.put("/user/", data).then((res) => {
      const { data } = res;
      setFname(data.fname);
      setLname(data.lname);
      return alert("Successfully Updated!");
    });
  };

  return (
    <div>
      <Title title={"My Account Information"} />
      <SubTitle de title={"Your Personal Details"} />
      <div className='mt-3'>
        <div className='form-group row'>
          <label className='col-sm-2 col-form-label text-lg-right text-sm-left'>
            First Name
          </label>
          <div className='col-sm-10'>
            <input
              ref={fnameRef}
              value={fname}
              onChange={formHandler}
              name='fname'
              type='text'
              placeholder='First Name'
              className='form-control'
            />
          </div>
        </div>
        <div className='form-group row'>
          <label className='col-sm-2 col-form-label text-lg-right text-sm-left'>
            Last Name
          </label>
          <div className='col-sm-10'>
            <input
              ref={LnameRef}
              value={lname}
              onChange={formHandler}
              name='lname'
              type='text'
              className='form-control'
              placeholder='Last Name'
            />
          </div>
        </div>
        <div className='form-group row'>
          <label className='col-sm-2 col-form-label text-lg-right text-sm-left'>
            Email
          </label>
          <div className='col-sm-10'>
            <input
              readonly
              type='email'
              value={email}
              onChange={formHandler}
              name='email'
              className='form-control '
              placeholder='Email '
            />
          </div>
        </div>
      </div>
      <div className='text-right'>
        <button className='btn btn-danger' onClick={onClickUpdateForm}>
          Update
        </button>
      </div>
    </div>
  );
}
