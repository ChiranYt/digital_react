import React from "react";

const ThankYou = ({ formStyle }) => {
  return (
    <form action="" style={formStyle}>
      <div
        style={{
          textAlign: "center",
          backgroundColor: "#D4EDDA", // light green background
          padding: "40px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
        className="thankyou"
      >
        <h2
          style={{
            fontSize: "2rem",
            color: "#124F69",
            marginBottom: "20px",
            fontFamily: "'Arial', sans-serif",
            fontWeight: "900",
          }}
        >
          Thank You!
        </h2>
        <p
          style={{
            fontSize: "1.2rem",
            color: "#333",
            marginBottom: "20px",
            fontFamily: "'Arial', sans-serif",
          }}
        >
          Your submission has been successfully received. We will get back to
          you shortly.
        </p>
        <a
          href="https://adsyzygy.in/"
          style={{
            padding: "10px 20px",
            fontSize: "1rem",
            backgroundColor: "#124F69",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#103a4d")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#124F69")}
        >
          {" "}
          Visit Our Main Website
        </a>
      </div>
    </form>
  );
};

export default ThankYou;
