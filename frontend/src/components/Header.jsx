import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./compo.css";

const Header = () => {
  return (
    <>
      <div
        className=" text-center py-3"
        style={{
          backgroundColor: "#f0f8ff",
          fontWeight: "bold",
          color: "#003366",
        }}
      >
        🎉 83% of Our Clients Hit Their Q3 Goals - It All Starts With a
        Marketing Plan 🎉
      </div>

      <nav className="navbar navbar navbar-expand-sm ">
        <a className="navbar-brand" href="">
          <img
            src="https://crm.adsyzygy.com/uploads/company/c53c372469ffd5176ac5d58995c2df53.png"
            alt="Logo"
            width="120"
            height="55"
          />
        </a>

        <div id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <a href="" className="nav-item">
              <span
                style={{ fontWeight: "450", cursor: "pointer" }}
                className="nav-link text-light"
              >
                Digital Marketing
              </span>
            </a>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
