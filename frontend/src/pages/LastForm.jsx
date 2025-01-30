import React, { useState } from "react";

const LastForm = ({
  formStyle,
  setLastStepSubmitted,
  setErrorMessage,
  errorMessage,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [agree, setAgree] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !agree) {
      setErrorMessage(
        "All fields are required, and you must agree to the terms."
      );
      return;
    }

    setErrorMessage(""); // Clear any previous errors

    const backendUrl =
      process.env.NODE_ENV === "production"
        ? "https://digital-marketing-backend-sry7.onrender.com" // Vercel production URL
        : "http://localhost:3000"; // Local development URL

    try {
      // Send data to the backend (replace with actual backend URL)
      const response = await fetch(`${backendUrl}/save-personal-info`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
        }),
      });

      if (response.ok) {
        setLastStepSubmitted(true); // Set the form as submitted
      } else {
        setErrorMessage("Failed to save the data.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred while saving your information.");
    }
  };

  return (
    <>
      <form id="proposal-form" onSubmit={handleSubmit} style={formStyle}>
        <div className="form-div">
          <div className="final-form">
            <div className="text-div">
              <h2>
                We’re putting your marketing plan & pricing options together.
                Who can we send them to?
              </h2>
            </div>

            {/* Name and Business Email in same row */}
            <div className="input-row">
              <div className="input-div">
                <label htmlFor="name">
                  Your Name<span className="form-star">*</span>{" "}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="input-div">
                <label htmlFor="email">
                  Business Email<span className="form-star">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Phone Number Input */}
            <div className="input-div-number">
              <label htmlFor="phone">
                Your Phone Number<span className="form-star">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            {/* Checkbox */}
            <div className="checkbox-div">
              <label>
                <input
                  type="checkbox"
                  name="agree"
                  checked={agree}
                  onChange={() => setAgree(!agree)}
                  required
                />
                <strong style={{ fontSize: "15px" }}>
                  I agree to receive other communications from Adsyzygy
                </strong>{" "}
                <br />
                <p>
                  You may unsubscribe from these communications at any time. For
                  more information on how to unsubscribe, our privacy practices,
                  and how we are committed to protecting and respecting your
                  privacy, please review our Privacy Policy. By clicking submit
                  below, you consent to allow Adsyzygy to store and process the
                  personal information submitted above to provide you the
                  content requested.
                </p>
              </label>
            </div>

            <div className="submit-div">
              <button type="submit">Send my free marketing plan</button>
            </div>

            {errorMessage && (
              <div className="errorMsg">
                <i
                  className="fa fa-exclamation-circle"
                  style={{ marginRight: "10px" }}
                ></i>
                {errorMessage}
              </div>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default LastForm;
