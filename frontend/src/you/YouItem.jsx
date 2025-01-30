import React from "react";
import "./you.css";
import marketingImg from "../../img/marketing.png";

const YouItem = () => {
  return (
    <>
      <div className="spacing"></div>
      <div className="goals-heading">
        <h2>
          <span>
            We Know What To Do Today, <br className="goals-br" />
            We Know What To Do Tomorrow
          </span>
        </h2>
        <h3>
          <span>
            At the same time we're working toward today's goals,
            <br className="goals-br" />
            we're planning the next steps to keep you ahead.
          </span>
        </h3>
      </div>
      <div className="spacing-3"></div>
      <div className="you-img-div">
        <div className="you-img-div2">
          <div>
            <img src={marketingImg} alt="" />
          </div>
        </div>
      </div>

      <div className="spacing-3"></div>

      <div className="goalbody-div">
        <ul className="goalbody-ul">
          <li>
            <div className="GB-inner2">
              <div className="GB-in-inner2">
                <h4>“How Long Does The Marketing Plan Take?”</h4>
                <h5>
                  <p>
                    Less than a day. In fact, it can be as quick as a few hours.
                    We do the heavy lifting, then show you the opportunities.
                  </p>
                </h5>
              </div>
            </div>
          </li>
          <li>
            <div className="GB-inner2">
              <div className="GB-in-inner2">
                <h4>“What Do You Need From Me?”</h4>
                <h5>
                  <p>
                    Any and all data you’re willing to share. This helps us give
                    you stronger recommendations backed by data and facts.
                  </p>
                </h5>
              </div>
            </div>
          </li>

          <li>
            <div className="GB-inner2">
              <div className="GB-in-inner2">
                <h4>“Does The Marketing Plan Cost Anything?”</h4>
                <h5>
                  <p>
                    Nothing at all. Also known as zip, zero, zilch, nada, nil,
                    nought, diddly-squat, free, and the square root of nothing.
                  </p>
                </h5>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default YouItem;
