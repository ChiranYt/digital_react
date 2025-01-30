import React from "react";

const FourthForm = ({
  setErrorMessage,
  formStyle,
  handleCorrectButtonClick,
  websiteURL,
  setWebsiteURL,
  errorMessage,
  setFourthFormSubmitted,
}) => {
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!websiteURL) {
      setErrorMessage("Please provide your website URL.");
    } else {
      setErrorMessage("");
      setFourthFormSubmitted(true);

      const backendUrl =
        process.env.NODE_ENV === "production"
          ? "https://backend-digitak-marketing.vercel.app" // Vercel production URL
          : "http://localhost:3000"; // Local development URL

      try {
        const response = await fetch(`${backendUrl}/save-website-url`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ client_site_url: websiteURL }), // Send URL to backend
        });

        if (response.ok) {
        } else {
          alert("Failed to save URL.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while saving the URL.");
      }
    }
  };

  return (
    <form id="proposal-form" onSubmit={handleFormSubmit} style={formStyle}>
      <div className="form-div">
        <div>
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
      </div>
    </form>
  );
};

export default FourthForm;
