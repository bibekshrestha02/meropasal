import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import SubTitle from "./../../Assets/Title";
import axios from "./../../Axios";

function UpdateProduct(props) {
  const [imagePath, setImagePath] = useState();
  const [Title, setTitle] = useState("");
  const [Price, setPrice] = useState("");
  const [Rating, setRating] = useState("");
  const [ItmesLeft, setItmesLeft] = useState("");
  const [Categories, setCategories] = useState("Laptop");
  const TitleHandler = (e) => {
    setTitle(e.target.value);
  };
  const PriceHandler = (e) => {
    setPrice(e.target.value);
  };
  const RatingHandler = (e) => {
    setRating(e.target.value);
  };
  const ItmesLeftHandler = (e) => {
    setItmesLeft(e.target.value);
  };
  const CategoriesHandler = (e) => {
    setCategories(e.target.value);
  };
  const onUploadFile = (e) => {
    setImagePath(e.target.files[0]);
    console.log(e.target.files);
  };
  const onUpload = (e) => {
    // const formData = new FormData();
  };
  const { id } = props.match.params;

  useEffect(() => {
    axios.get(`api//categories/${id}`).then((res) => {
      const { data } = res.data;
      setCategories(data.Categories);
      setTitle(data.Title);
      setImagePath(data.Photo);
      setRating(data.Rating);
      setItmesLeft(data.ItemsLeft);
      setCategories(data.Categories);
      setPrice(data.Price);
    });
  }, [id]);

  const onSubmit = () => {
    if (!Title || !Price || !ItmesLeft || !Categories) {
      return alert("Fill Up the form");
    }
    const data = {
      Title,
      Price: Price * 1,
      ItemsLeft: ItmesLeft * 1,
      Categories,
      Rating: Rating * 1,
      Photo: imagePath,
    };
    axios
      .patch(`/api/Products/${id}`, data)
      .then((res) => {
        // console.log(res.data);
        if (res.data.status === "success") {
          alert("Product Updated");
          props.history.push("/");
        } else alert("Title already Exist");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <SubTitle Title='Update Itmes' />
      <div className='row mt-3 pt-3'>
        <div className='col-lg-4'>
          <div className='text-center'>
            <img
              src={imagePath}
              className='rounded'
              alt='...'
              width='200px'
              style={{ backgroundColor: "gray", padding: "9px" }}
            />
            <div className='row mt-2'>
              <div className='col-lg-6'>
                <input type='file' onChange={onUploadFile} />
              </div>
              <div className='col-lg-6'>
                <input type='button' onClick={onUpload} value='Upload' />
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-7' style={{ height: "50vh" }}>
          <input
            type='text'
            className='form-control'
            placeholder='Title'
            value={Title}
            onChange={TitleHandler}
          />
          <br />
          <div className='row'>
            <div className='col'>
              <input
                type='text'
                className='form-control'
                placeholder='Price'
                value={Price}
                onChange={PriceHandler}
              />
            </div>
            <div className='col'>
              <input
                value={ItmesLeft}
                type='text'
                className='form-control'
                placeholder='Itmes Left'
                onChange={ItmesLeftHandler}
              />
            </div>
          </div>
          <br />
          <div className='row'>
            <div className='col'>
              <input
                value={Rating}
                type='text'
                onChange={RatingHandler}
                className='form-control'
                placeholder='Rating'
              />
            </div>
            <div className='col'>
              <select
                className='form-control'
                onChange={CategoriesHandler}
                value={Categories}>
                <option value='Laptop'>Laptop</option>
                <option value='Mobile'>Mobile</option>
                <option value='Monitor'>Monitor</option>
              </select>
            </div>
          </div>
          <br />
          <button className='btn btn-block btn-danger' onClick={onSubmit}>
            Update Items
          </button>
        </div>
      </div>
    </>
  );
}
export default withRouter(UpdateProduct);
