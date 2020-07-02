import React, { useState } from "react";
import SubTitle from "./../../Assets/Title";
import axios from "./../../Axios";
export default function AddProduct() {
  const [imagePath, setImagePath] = useState("");
  const [Title, setTitle] = useState("");
  const [Price, setPrice] = useState("");
  const [Rating, setRating] = useState("");
  const [ItmesLeft, setItmesLeft] = useState("");
  const [Categories, setCategories] = useState("Laptop");
  const [fileData, setFileData] = useState();
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
    const fileData = e.target.files[0];
    setFileData(fileData);
  };
  const onUpload = (e) => {
    if (!fileData) {
      return alert("Please select Image");
    }
    const formData = new FormData();
    formData.append("myImage", fileData);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    axios.post("/api/Product/upload", formData, config).then((res) => {
      const fileName = res.data.fileName;
      setImagePath(`/images/${fileName}`);
    });
  };
  const onSubmit = () => {
    if (!Title || !Price || !ItmesLeft || !Categories) {
      return alert("Fill Up the form");
    }
    if (!imagePath) {
      return alert("Please select an Image");
    }
    const data = {
      Title,
      Price: Price * 1,
      ItemsLeft: ItmesLeft * 1,
      Categories,
      Rating: Rating * 1,
      Photo: imagePath,
    };
    axios.post("/api/Products", data).then((res) => {
      if (res.data.status === "Success") {
        alert("Product Add");
        setPrice("");
        setRating("");
        setTitle("");
        setItmesLeft("");
        setImagePath("");
      } else alert("Title already Exist");
    });
  };
  return (
    <>
      <SubTitle Title='Add Itmes' />
      <div className='row mt-3 pt-3 mx-auto container'>
        <div className='col-lg-4'>
          <div className='text-center'>
            <img
              src={!imagePath ? "/images/uploadImg.png" : imagePath}
              className='rounded'
              alt='...'
              width='200px'
              style={{ backgroundColor: "gray", padding: "9px" }}
            />
            <div className='row mt-3'>
              <div className='col-lg-6 col-sm-12'>
                <input type='file' onChange={onUploadFile} />
              </div>
              <div className='col-lg-6 col-sm-12'>
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
          <div className='text-right'>
            <button className='btn btn-danger' onClick={onSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
