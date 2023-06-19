import React, { useContext } from "react";
import alertContext from "../context/alert/alertContext";

const Alert = () => {
  const context = useContext(alertContext);
  if (!context.alert) {
    return <div></div>;
  }
  const { alert } = context;
  return (
    <div className={`alert alert-${alert.type}`} role="alert">
      {alert.msg}
    </div>
  );
};

export default Alert;
