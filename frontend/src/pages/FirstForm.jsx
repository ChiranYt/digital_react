import React, { useState } from "react";

const FirstForm = ({
  setActiveButtons,
  buttonStyle,
  activeButtons,
  handleButtonClick,
  errorMessage,
  formStyle,
  setErrorMessage,
  setFormSubmitted,
}) => {
  const [formData, setFormData] = useState({
    ClientNeed: [],
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (activeButtons.length === 0) {
      setErrorMessage("You must choose at least one service to continue.");
    } else {
      setErrorMessage("");

      // Define the button labels (same as before)
      const buttonLabels = [
        "Paid Advertising",
        "Content Marketing",
        "Creative Work",
        "Search Engine Optimization (SEO)",
        "Conversion Rate Optimization (CRO)",
        "Paid Search",
        "Paid Social",
        "Other",
      ];

      // Map the indices to actual labels
      const selectedLabels = activeButtons.map((index) => buttonLabels[index]);

      // Convert the array of selected labels into a string
      const selectedLabelsString = selectedLabels.join(", "); // "Paid Advertising, Creative Work, Paid Search"

      // Prepare data to send to the backend
      const dataToSend = {
        ClientNeed: selectedLabelsString, // Send the label text instead of index
      };

      const backendUrl =
        process.env.NODE_ENV === "production"
          ? "https://backend-digitak-marketing.vercel.app" // Vercel production URL
          : "http://localhost:3000"; // Local development URL

      try {
        const response = await fetch(
          "https://digital-marketing-backend-sry7.onrender.com/save-buttons",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json", // Good practice
            },
            body: JSON.stringify(dataToSend),
            credentials: "include", // Or credentials: true - ESSENTIAL for CORS with credentials
          }
        );

        if (response.ok) {
          setFormSubmitted(true);
          setActiveButtons([]);
        } else {
          const errorData = await response.json(); // Try to get error details from the server
          alert(
            `Failed to save data: ${errorData.message || response.statusText}`
          ); // Display a more informative error message
          console.error("Server Error:", errorData); // Log the detailed error to the console
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        alert("An error occurred while saving the data.");
      }
    }
  };
  return (
    <form id="proposal-form" onSubmit={handleFormSubmit} style={formStyle}>
      <div className="form-div">
        <div>
          <div className="text-div">
            <h2>What do you need help with?</h2>
            <h3>Select all that apply</h3>
          </div>
          <div className="button-div">
            {[
              "Paid Advertising",
              "Content Marketing",
              "Creative Work",
              "Search Engine Optimization (SEO)",
              "Conversion Rate Optimization (CRO)",
              "Paid Search",
              "Paid Social",
              "Other",
            ].map((label, index) => (
              <button
                key={index}
                type="button"
                style={buttonStyle(activeButtons.includes(index))}
                onClick={() => handleButtonClick(index)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="submit-div">
            <button type="submit">Start My Free Marketing Plan</button>
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

export default FirstForm;
