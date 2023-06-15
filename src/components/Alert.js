import React, {useContext} from "react";
import alertContext from "../context/notes/alertContext";


const Alert = () => {
  const context = useContext(alertContext);
  return (
    context&&(
    <div class={`alert alert-${context.alert.type}`} role="alert">
      {context.alert.msg}
    </div>)
  );
};

export default Alert;
