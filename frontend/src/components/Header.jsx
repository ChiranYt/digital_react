import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    var Tawk_API = Tawk_API || {};
    var Tawk_LoadStart = new Date();

    (function () {
      var s1 = document.createElement("script");
      s1.async = true;
      s1.src = "https://embed.tawk.to/6375ce5bdaff0e1306d7da5e/1gi22s6j7";
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");
      var s0 = document.getElementsByTagName("script")[0];
      s0.parentNode.insertBefore(s1, s0);
    })();
  }, []);

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
          <a
            className="navbar-brand"
            href="https://adsyzygy.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Adsyzygy homepage"
          >
            <img
              src="https://adsyzygy.com/img/webp/logo.jpg"
              alt="Adsyzygy Logo"
              width="150"
              height="50"
              className="logo-img"
              style={{ cursor: "pointer" }}
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

          <a
            href="tel:+18136677184"
            className="btn ms-auto"
            style={{
              backgroundColor: "#f0ad4e",
              color: "#fff",
              borderRadius: "25px",
              fontWeight: "500",
              padding: "8px 18px",
              border: "none",
            }}
          >
            📞 +1 813 667 7184
          </a>
        </nav>
      )}
    </>
  );
};

export default Header;
