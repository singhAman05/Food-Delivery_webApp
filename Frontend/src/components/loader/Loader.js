import React from "react";
import "./loader.css";

const Loader = ({ loading }) => {
  return (
    loading && (
      <div className="loader-overlay">
        <div className="loader"></div>
      </div>
    )
  );
};

export default Loader;
