import React, { useContext, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { Carts } from "./../../../Store/CartStore";
import Auth from "../../../classes/Auth";
function NavBrand(props) {
  const [cartsNmber] = useContext(Carts);
  const [searchValue, setSearchValue] = useState("");
  const searchPage = () => {
    props.history.push(`/search/${searchValue}`);
  };
  const searchValueHandler = (e) => {
    setSearchValue(e.target.value);
    e.preventDefault();
  };
  return (
    <div className='Nav-Brand row'>
      <div className=' col-lg-4 col-md-4 pt-3 col-sm-12 '>
        <Link className='Link Carts' to='/Cart'>
          <i className='fa fa-shopping-cart' />
          <span className='border'></span>
          <span className='text'>
            <b>{new Auth().isAuthenticate ? cartsNmber : 0}</b> My Carts
          </span>
        </Link>
      </div>
      <div className='col-lg-4 col-md-4 col-sm-12 '>
        <img src='/images/Logo.png' alt='Brand Logo' width='200px' />
      </div>
      <div className='form-search col-lg-4 col-md-4 col-sm-12 pt-lg-3 pt-md-3'>
        <input
          type='text'
          value={searchValue}
          placeholder='Search Items '
          id='Search'
          onChange={searchValueHandler}
        />
        <button className='button' onClick={searchPage}>
          <i className='fa fa-search'></i>
        </button>
      </div>
    </div>
  );
}
export default withRouter(NavBrand);
