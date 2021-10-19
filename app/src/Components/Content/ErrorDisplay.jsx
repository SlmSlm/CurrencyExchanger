import React from "react";

const ErrorDisplay = () => {
  return (
    <div>
      {localStorage.removeItem("loadCounter")}
      Ooops, smthng went wrong. <br /> Please try to reload the page
    </div>
  );
};

export default ErrorDisplay;
