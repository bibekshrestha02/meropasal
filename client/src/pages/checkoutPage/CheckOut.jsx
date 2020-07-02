import React, { useState, useRef, useContext } from "react";
import Title from "./../CustomerAccount/Assets/Title";
import SubTitle from "./../CustomerAccount/Assets/subTitle";
import style from "./style.module.scss";
import { withRouter } from "react-router-dom";
import Linkdir from "./../../components/LinksDir/LinkDir";
import Axios from "./../../Axios";
import { Carts } from "./../../Store/CartStore";
import SuccessModel from "./SuccessMode";
function CheckOut(props) {
  const [street1, setStreet1] = useState("");
  const [street2, setStreet2] = useState("");
  const [country, setCountry] = useState("");
  const [district, setDistrict] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [contact, setContact] = useState("");
  const formRef = useRef();
  const setCartNumber = useContext(Carts);
  const [isSuccess, setIsSuccess] = useState(false);
  const formHandler = (e) => {
    const { name } = e.target;
    const { value } = e.target;
    if (name === "street1") {
      return setStreet1(value);
    } else if (name === "street2") {
      return setStreet2(value);
    } else if (name === "country") {
      return setCountry(value);
    } else if (name === "district") {
      return setDistrict(value);
    } else if (name === "zipCode") {
      return setZipCode(value);
    } else if (name === "contact") {
      return setContact(value);
    }
  };
  const onFormSubmit = (e) => {
    if (!street1 || !street2 || !district || !zipCode || !country || !contact) {
      formRef.current.focus();
      return window.scrollTo(0, 0);
      // return alert("Please fill up the form");
    }
    const address = {
      zipCode,
      streetAddress: {
        street1,
        street2,
      },
      country,
      district,
    };
    const data = {
      address,
      contact,
    };
    Axios.post("/order", data).then((res) => {
      if (res.data.status === "success") {
        setCartNumber[1](0);
        setIsSuccess(true);
        setTimeout(() => {
          return props.history.push("/");
        }, 1000);
      }
    });
  };
  return (
    <div>
      <Linkdir
        firstLink='Carts'
        secondLink='CheckOut'
        secondLinkTo='/checkout'
        firstLinkTo='/Cart'
      />
      <div className={`${style.CheckOut} border`}>
        <Title title='Checkout' />
        <SubTitle title='Shipping Address' />
        {isSuccess && <SuccessModel />}
        <div className='mt-3'>
          <div className='form-group '>
            <label>Street Address</label>
            <input
              ref={formRef}
              type='text'
              name='street1'
              value={street1}
              onChange={formHandler}
              placeholder='Street 1'
              className='form-control'
            />
            <input
              type='text'
              name='street2'
              value={street2}
              onChange={formHandler}
              placeholder='Street 2'
              className='form-control mt-1'
            />
          </div>
          <div className='form-group '>
            <label>Country</label>
            <input
              type='text'
              name='country'
              value={country}
              onChange={formHandler}
              className='form-control'
              placeholder='Country'
            />
          </div>
          <div className='form-group '>
            <label> District</label>
            <input
              name='district'
              value={district}
              onChange={formHandler}
              type='text'
              className='form-control'
              placeholder='District'
            />
          </div>
          <div className='form-group '>
            <label>Zip/Postal Code</label>
            <input
              name='zipCode'
              value={zipCode}
              onChange={formHandler}
              type='Number'
              className='form-control'
              placeholder='Zip/Postal Code'
            />
          </div>
          <div className='form-group '>
            <label>Phone Number</label>
            <input
              name='contact'
              value={contact}
              onChange={formHandler}
              type='number'
              className='form-control'
              placeholder='Number'
            />
          </div>
          <div className='text-right'>
            <button onClick={onFormSubmit} className='btn  btn-lg btn-danger'>
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(CheckOut);
