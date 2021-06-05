import React from "react";
import "./MyCard.css";

const MyCard = ({ title, children }) => {
  return (
    <div className="card-container">
      <h4 className='card-title'>{title}</h4>
      {children}
    </div>
  );
};

export default MyCard;
