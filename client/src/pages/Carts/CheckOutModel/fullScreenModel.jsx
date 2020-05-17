import React from "react";

export default function fullScreenModel(props) {
  return (
    <div
      className={props.ModalHandler ? "fullScreenModel" : "close"}
      onClick={props.closeHandler}></div>
  );
}
