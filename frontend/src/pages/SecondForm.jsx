import React, { useState } from "react";

const SecondForm = ({
  setErrorMessage,
  setActiveButtons,
  formStyle,
  buttonStyle,
  activeButtons,
  handleButtonClick,
  errorMessage,
  setSecondFormSubmitted,
}) => {
  const [goalData, setGoalData] = useState(""); // to store selected goals

  const handleSecondFormSubmit = async (e) => {
    e.preventDefault();

    if (activeButtons.length === 0) {
      setErrorMessage("You must choose at least one goal.");
    } else {
      setErrorMessage("");
      setSecondFormSubmitted(true);

      // Define the button labels for the goals (same as before)
      const buttonLabels = [
        "Increase revenue",
        "Increase profit",
        "Get more conversions",
        "Lower my acquisition cost",
        "Improve my ROI",
        "All of the above",
        "Other",
      ];

      // Map the selected indices to the actual labels
      const selectedLabels = activeButtons.map((index) => buttonLabels[index]);

      // Convert the array of selected labels into a string
      const selectedLabelsString = selectedLabels.join(", "); // "Increase revenue, Improve my ROI"

      // Prepare data to send to the backend
      const dataToSend = {
        ClientGoal: selectedLabelsString, // Send the goal labels as a string
      };

      const backendUrl =
        process.env.NODE_ENV === "production"
          ? "https://backend-digitak-marketing.vercel.app" // Vercel production URL
          : "http://localhost:3000"; // Local development URL

      try {
        const response = await fetch(`${backendUrl}/save-goals`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        });

        if (response.ok) {
        } else {
          alert("Failed to save goals.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while saving the data.");
      }

      setActiveButtons([]); // Reset active buttons
    }
  };

  return (
    <form
      id="proposal-form"
      onSubmit={handleSecondFormSubmit}
      style={formStyle}
    >
      <div className="form-div">
        <div>
          <div className="text-div">
            <h2>What are your goals?</h2>
            <h3>Select all that apply</h3>
          </div>
          <div className="button-div">
            {[
              "Increase revenue",
              "Increase profit",
              "Get more conversions",
              "Lower my acquisition cost",
              "Improve my ROI",
              "All of the above",
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
            <button type="submit">ALMOST THERE</button>
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

export default SecondForm;
