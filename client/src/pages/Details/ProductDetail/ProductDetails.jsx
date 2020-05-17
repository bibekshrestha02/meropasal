import React, { useState } from "react";
import Star from "../../../Assets/rating";
import Price from "../../../Assets/price";
import Manager from "../../../Assets/qualityManger";
import SubTitle from "../../../Assets/subtitle";
import { withRouter } from "react-router-dom";
import Auth from "../../../classes/Auth";
// import { Carts } from "./../../../Store/CartStore";
import CheckOutModel from "./../../Carts/CheckOutModel/modal";
import FullScrenModel from "./../../Carts/CheckOutModel/fullScreenModel";
import Axios from "./../../../Axios";
import "./ProductDetails.css";
function ProductDetails(props) {
  const [number, setNumber] = useState(1);
  const [ModalHandler, setModalHandler] = useState(false);
  const Increae = (limits) => {
    if (number >= limits) {
      setNumber(limits);
    } else setNumber(number + 1);
  };
  const [cartsAdd, setCartsAdd] = useState(false);
  const Decrease = () => {
    if (number <= 1) {
      setNumber(1);
    } else setNumber(number - 1);
  };
  const addItemsFn = () => {
    if (!new Auth(props.history).isAuthenticate()) {
      return props.history.push("/login");
    }
    const data = {
      order: number,
      productId: props.id,
    };
    Axios.post("/cartApi/carts", data)
      .then((res) => {
        console.log(res);
        setCartsAdd(true);
      })
      .then((res) => {
        setCartsAdd(false);
        // console.log("sucees");
      })
      .catch((err) => {
        alert("someThing Went Wrond");
      });
  };
  const closeHandler = () => {
    if (!new Auth(props.history).isAuthenticate()) {
      return props.history.push("/login");
    }
    setModalHandler((e) => !e);
  };
  // deleting the product
  const deleteProduct = (id) => {
    alert("Are You Sure");
    Axios.delete(`/api/Products/${id}`)
      .then((res) => {
        alert("Delted");
        props.history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let Details = "loading";

  if (props.State) {
    const data = props.Data;
    Details = (
      <div className='row mt-4 Details container-fluid'>
        <div className='col-lg-3 col-md-4 col-sm-12 image'>
          <img className='photo' src={data.Photo} alt='Product' />
        </div>

        <div className='col-lg-9 col-md-8 col-sm-12'>
          <SubTitle Subtitle={data.Title} />
          <Star Rating={data.Rating} />
          <div className='mt-3'>
            <Price Price={data.Price} />
          </div>
          <div className='quality mt-1'>
            <span className='Tags'>Availability</span> :
            <span className='quality'>
              <b> {data.ItemsLeft}</b> in stock
            </span>
          </div>
          <div className='manager mt-2'>
            <span>
              <b>Quality : </b>
              <Manager
                ItemsLeft={data.ItemsLeft}
                number={number}
                Increase={Increae}
                Decrease={Decrease}
              />
            </span>
          </div>
          <div className='mt-3 mb-3 row'>
            <span className='btn btn-success mr-4' onClick={closeHandler}>
              Buy Now
            </span>
            <CheckOutModel
              subTotal={data.Price}
              product={data}
              ModalHandler={ModalHandler}
              closeHandler={closeHandler}
            />
            <FullScrenModel
              ModalHandler={ModalHandler}
              closeHandler={closeHandler}
            />
            <button
              className='btn btn-warning'
              disabled={cartsAdd}
              onClick={addItemsFn}>
              {cartsAdd ? "Adding..." : "Add to Carts"}
            </button>
            {new Auth(props.history).isAdmin() ? (
              <>
                <span
                  className='btn btn-primary ml-4'
                  onClick={() =>
                    props.history.push(`/productUpdate/${data._id}`)
                  }>
                  Update
                </span>
                <span
                  className='btn btn-danger ml-4'
                  onClick={() => {
                    deleteProduct(data._id);
                  }}>
                  Delete
                </span>
              </>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  return Details;
}

export default withRouter(ProductDetails);
