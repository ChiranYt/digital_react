import React, { useState } from "react";

const ThirdForm = ({
  setThirdFormSubmitted,
  setActiveButtons,
  setErrorMessage,
  formStyle,
  buttonStyle,
  activeBudgetButton,
  handleBudgetButtonClick,
  errorMessage,
}) => {
  const [budgetData, setBudgetData] = useState(""); // to store selected budget

  const handleThirdFormSubmit = async (e) => {
    e.preventDefault();

    if (activeBudgetButton === null) {
      setErrorMessage("You must choose a budget.");
    } else {
      setErrorMessage("");
      setThirdFormSubmitted(true);

      // Define the budget options (same as before)
      const budgetOptions = [
        "$0 - $1,000",
        "$1,001 - $5,000",
        "$5,001 - $10,000",
        "$10,001 - $25,000",
        "$25,001 - $100,000",
        "$100,001 + ",
      ];

      // Get the selected budget label based on the selected index
      const selectedBudget = budgetOptions[activeBudgetButton];

      // Prepare data to send to the backend
      const dataToSend = {
        ClientBudget: selectedBudget, // Send the selected budget option
      };

      const backendUrl =
        process.env.NODE_ENV === "production"
          ? "https://backend-digitak-marketing.vercel.app" // Vercel production URL
          : "http://localhost:3000"; // Local development URL

      try {
        const response = await fetch(`${backendUrl}/save-budget`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        });

        if (response.ok) {
        } else {
          alert("Failed to save budget.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while saving the data.");
      }

      setActiveButtons([]); // Reset active buttons
    }
  };

  return (
    <form id="proposal-form" onSubmit={handleThirdFormSubmit} style={formStyle}>
      <div className="form-div">
        <div>
          <div className="text-div">
            <h2>What’s your current monthly digital marketing budget?</h2>
            <h3>
              Don’t worry, we won’t judge - an estimated guess is fine too
            </h3>
          </div>
          <div className="button-div">
            {[
              "$0 - $1,000",
              "$1,001 - $5,000",
              "$5,001 - $10,000",
              "$10,001 - $25,000",
              "$25,001 - $100,000",
              "$100,001 + ",
            ].map((label, index) => (
              <button
                key={index}
                type="button"
                style={buttonStyle(activeBudgetButton === index)}
                onClick={() => handleBudgetButtonClick(index)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="submit-div">
            <button type="submit">Continue</button>
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

export default ThirdForm;
