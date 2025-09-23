import React from "react";
import "./marketing.css";
import Form from "./Form";

const MarketingHead = () => {
  return (
    <>
      <div className="marketing-bg">
        <div className="spacing"></div>
        <div className="heading-div" id="m-head">
          <h1 className="main-heading">
            <span>
              Get Your Free Marketing Plan
              <br />
              From <u className="under-line">Real Client Data</u>
            </span>
          </h1>
          <h2 className="main-heading-h2">
            <span className="text-formatting">
              We crowdsource winning marketing strategies <br />
              from our 250+ active clients so you win faster.
            </span>
          </h2>
        </div>

        <Form />
        <div className="spacing"></div>
      </div>
    </>
  );
};

export default MarketingHead;
