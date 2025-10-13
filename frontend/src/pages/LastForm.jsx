import React, { useState } from "react";

const LastForm = ({
  formStyle,
  handleLastStepSubmit,
  errorMessage,
  setErrorMessage,
  setFormData,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [agree, setAgree] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !agree) {
      setErrorMessage("All fields are required and you must agree.");
      return;
    }

    const updatedPersonalInfo = { name, email, phone };

    // Build full formData and submit directly
    setFormData((prev) => {
      const updatedFormData = {
        ...prev,
        personalInfo: updatedPersonalInfo,
      };
      handleLastStepSubmit(updatedFormData); // ✅ submit with correct data
      return updatedFormData;
    });
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <div className="form-div">
        <div className="final-form">
          <div className="text-div">
            <h2>
              We’re putting your marketing plan & pricing options together. Who
              can we send them to?
            </h2>
          </div>
          <div className="input-row">
            <div className="input-div">
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrorMessage("");
                }}
                placeholder="Name"
              />
            </div>
            <div className="input-div">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMessage("");
                }}
                placeholder="Business Email"
              />
            </div>
          </div>
          <div className="input-div-number">
            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setErrorMessage("");
              }}
              placeholder="Phone"
            />
          </div>
          <div className="checkbox-div">
            <label>
              <input
                type="checkbox"
                checked={agree}
                onChange={() => {
                  setAgree(!agree);
                  setErrorMessage("");
                }}
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
                personal information submitted above to provide you the content
                requested.
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
  );
};

export default LastForm;
