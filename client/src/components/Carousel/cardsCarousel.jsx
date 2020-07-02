import React from "react";
import style from "./carousel Css/style.module.scss";
export default function CardsCarousel(props) {
  const { className } = props;
  return (
    <div className={className}>
      <div className='row'>
        <div className={`${style.mainText} col-6`}>
          <span className={`${style.onDay}`}>{props.onDay}</span>
          <span className={`${style.arrivals}`}>{props.arrivals}</span>
          <span className={`${style.slogan}`}>{props.slogan}</span>
        </div>
        <div className='col-6'>
          <img className={`${style.photo}`} src={props.photo} alt='img' />
        </div>
      </div>
    </div>
  );
}
