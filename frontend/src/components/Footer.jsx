import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <p>&copy; Copyright 2025 Adsyzygy. All Rights Reserved</p>
            </div>
            <div className="col-md-6">
              <p className="text-right">
                <a href="https://adsyzygy.com/privacy"  rel="noopener noreferrer">
                  Privacy Policy
                </a>{" "}
                |
                <a href="https://adsyzygy.com/terms-and-conditions"  rel="noopener noreferrer">
                  Terms & Conditions
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
