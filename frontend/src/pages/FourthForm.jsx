import React from "react";

const FourthForm = ({
  formStyle,
  websiteURL,
  setWebsiteURL,
  handleCorrectButtonClick,
  setErrorMessage,
  setFourthFormSubmitted,
  setFormData,
  errorMessage,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!websiteURL) {
      setErrorMessage("Please provide your website URL.");
      return;
    }

    setFormData((prev) => ({ ...prev, clientSiteURL: websiteURL }));
    setFourthFormSubmitted(true);
    setErrorMessage("");
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <div className="form-div">
        {/* <h2>Are you from 12.com?</h2>
        <button type="button" onClick={handleCorrectButtonClick}>
          Yes, that's correct!
        </button>
        <h3>If not, enter your company website URL:</h3>
        <input
          type="text"
          value={websiteURL}
          onChange={(e) => setWebsiteURL(e.target.value)}
          placeholder="mywebsite.com"
        /> */}
        <div className="text-div">
          <h2>Are you from 12.com?</h2>
          <div>
            <button
              type="button"
              className="correct-btn"
              onClick={handleCorrectButtonClick}
            >
              Yes, that's correct!
            </button>
          </div>
          <h3>If not, please let us know your company website URL:</h3>
          <div>
            <input
              type="text"
              className="url-input"
              placeholder="mywebsite.com"
              value={websiteURL}
              onChange={(e) => setWebsiteURL(e.target.value)} // Allow manual editing
            />
          </div>
        </div>
        <div className="submit-div">
          <button type="submit">Last step</button>
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
    </form>
  );
};

export default FourthForm;
