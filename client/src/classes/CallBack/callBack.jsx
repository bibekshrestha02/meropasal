import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import Auth from "./../../classes/Auth";
function CallBack(props) {
  useEffect(() => {
    return new Auth(props.history).handleAuth();
  });
  return (
    <div>
      <h1>Loading</h1>
    </div>
  );
}
export default withRouter(CallBack);
