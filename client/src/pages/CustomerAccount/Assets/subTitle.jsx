import React from "react";
import style from "./../css/Assets.module.scss";
export default function subTitle(props) {
  return (
    <div
      className={props.de ? style.subTitleDe : style.subTitle}
      onClick={props.onClick && props.onClick}>
      <div className='row'>
        <div className='col-9'>
          <span>{props.title}</span>
        </div>
        <div className='col-3'>
          {props.toogle ? <span className={style.toogle}>V</span> : null}
        </div>
      </div>

      <div className={style.hr}></div>
    </div>
  );
}
