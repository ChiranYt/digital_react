import React from "react";
import "./you.css";
import marketingImg from "../../img/marketing.png";

const YouItem = () => {
  return (
    <>
      <section className="strategy-section">
        <div className="container">
          <h2 className="heading">
            We Know <span>What To Do Today,</span> <br />
            We Know <span>What To Do Tomorrow</span>
          </h2>
          <p className="subtext">
            Our data-driven strategies ensure your brand stays ahead in the
            fast-evolving digital world.
          </p>
          <div className="buttons">
            <a href="#" className="btn">
              Get Started
            </a>
           <a
  href="https://adsyzygy.com/contact"
  target="_blank"
  className="btn btn-outline"
  rel="noopener noreferrer"
  aria-label="Learn more about contacting Adsyzygy"
>
  Learn More
</a>

          </div>
        </div>
      </section>

      <section className="modern-section">
        <div className="container">
          <h2 className="section-heading">Our Expertise, Your Advantage</h2>
          <p className="section-subheading">
            We deliver innovative strategies that create lasting value for your
            business.
          </p>

          <div className="feature-list">
            <div className="feature-item">
              <h3 className="feature-title">Strategic Innovation</h3>
              <p className="feature-description">
                We harness innovative ideas and strategic thinking to keep your
                business ahead of the curve.
              </p>
            </div>

            <div className="feature-item">
              <h3 className="feature-title">Seamless Execution</h3>
              <p className="feature-description">
                Our expert team ensures flawless execution of all strategies,
                keeping your goals in focus.
              </p>
            </div>

            <div className="feature-item">
              <h3 className="feature-title">Sustainable Growth</h3>
              <p className="feature-description">
                We provide sustainable, long-term growth solutions that evolve
                with your business needs.
              </p>
            </div>
          </div>

          <a href="#" className="cta-btn">
            Let's Connect
          </a>
        </div>
      </section>
    </>
  );
};

export default YouItem;
