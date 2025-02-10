import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./compo.css";

const Header = () => {
  const [isVisible, setIsVisible] = useState(true); // Controls announcement visibility
  const [isNavbarVisible, setIsNavbarVisible] = useState(true); // Controls navbar visibility

  const handleClose = (event) => {
    event.stopPropagation(); // Stop event bubbling
    // Start the hide animation
    setIsVisible(false);

    // Optionally, after animation, you can remove the bar completely (e.g., after 0.6s)
    setTimeout(() => setIsVisible(false), 500); // Matches the duration of the transition
  };

  return (
    <>
      {/* Announcement Bar */}
      {isVisible && (
        <div className={`announcement-bar ${!isVisible ? "hidden" : ""}`}>
          🎉 83% of Our Clients Hit Their Q3 Goals - It All Starts With a
          Marketing Plan 🎉
          <span className="close-announcement" onClick={handleClose}>
            &times;
          </span>
        </div>
      )}

      {/* Navbar */}
      {isNavbarVisible && (
        <nav className="navbar navbar-expand-sm">
          <a className="navbar-brand" href="/">
            <img
              src="https://adsyzygy.com/img/webp/logo.jpg"
              alt="Logo"
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
          </a>
          <div id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="">
                  Digital Marketing
                </a>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </>
  );
};

export default Header;
