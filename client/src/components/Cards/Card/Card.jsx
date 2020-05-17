import React from "react";
import { Link } from "react-router-dom";
import Rating from "../../../Assets/rating";
import Price from "../../../Assets/price";
import "./Card.css";

export default function Card(props) {
  let cards = (
    <div className='card mt-2'>
      <div className='img text-center'>
        <img className='card-img-top' src={props.Image} alt='cards ' />
      </div>
      <div className='card-body'>
        <span className='card-title'>
          <Link to={props.Link} className='link'>
            {props.Title}
          </Link>
        </span>
        <br />
        <Rating Rating={props.Rating} />
        <Price Price={props.Price} />
      </div>
    </div>
  );
  if (!props.loading) {
    return (
      <div className='card mt-2'>
        <div className='img text-center'></div>
        <div className='card-body'>
          <span className='card-title'>
            <div className='title'></div>
          </span>

          <Rating Rating={props.Rating} loading={props.loading} />
          {/* <Price Price={props.Price} /> */}
        </div>
      </div>
    );
  }
  return cards;
}
