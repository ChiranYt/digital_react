import React from "react";

const ThirdForm = ({
  setThirdFormSubmitted,
  activeBudgetButton,
  handleBudgetButtonClick,
  buttonStyle,
  setActiveButtons,
  setErrorMessage,
  errorMessage,
  formStyle,
  setFormData,
}) => {
  const budgetOptions = [
    "$0 - $1,000",
    "$1,001 - $5,000",
    "$5,001 - $10,000",
    "$10,001 - $25,000",
    "$25,001 - $100,000",
    "$100,001+",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeBudgetButton === null) {
      setErrorMessage("You must choose a budget.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      clientBudget: budgetOptions[activeBudgetButton],
    }));

    setThirdFormSubmitted(true);
    setActiveButtons([]);
    setErrorMessage("");
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <div className="form-div">
        <div className="text-div">
          <h2>What’s your current monthly digital marketing budget?</h2>
          <h3>Don’t worry, we won’t judge - an estimated guess is fine too</h3>
        </div>
        <div className="button-div">
          {budgetOptions.map((label, i) => (
            <button
              key={i}
              type="button"
              style={buttonStyle(activeBudgetButton === i)}
              onClick={() => handleBudgetButtonClick(i)}
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
    </form>
  );
};

export default ThirdForm;
