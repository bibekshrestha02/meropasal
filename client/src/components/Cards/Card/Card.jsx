import React from "react";
import { Link } from "react-router-dom";
import Rating from "../../../Assets/rating";
import Price from "../../../Assets/price";
import style from "./card.module.scss";

export default function Card(props) {
  let cards = (
    <div className={`${style.cards} mt-2`}>
      <div className={`${style.img} text-center`}>
        <img className='card-img-top' src={props.Image} alt='cards' />
      </div>
      <div className={`${style.cardbody} card-body`}>
        <Link to={props.Link}>{props.Title}</Link>
        <Rating Rating={props.Rating} />
        <Price Price={props.Price} />
      </div>
    </div>
  );

  return cards;
}
