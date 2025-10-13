import React from "react";

const FirstForm = ({
  setActiveButtons,
  buttonStyle,
  activeButtons,
  handleButtonClick,
  errorMessage,
  formStyle,
  setErrorMessage,
  setFormData,
  setFormSubmitted,
}) => {
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (activeButtons.length === 0) {
      setErrorMessage("You must choose at least one service to continue.");
      return;
    }

    const selectedLabels = activeButtons.map((i) => buttonLabels[i]);
    setFormData((prev) => ({
      ...prev,
      clientNeed: selectedLabels.join(", "),
    }));

    setFormSubmitted(true);
    setActiveButtons([]);
    setErrorMessage("");
  };

  return (
    <form onSubmit={handleFormSubmit} style={formStyle}>
      <div className="form-div">
        <div className="text-div">
          <h2>What do you need help with?</h2>
          <h3>Select all that apply</h3>
        </div>
        <div className="button-div">
          {buttonLabels.map((label, i) => (
            <button
              key={i}
              type="button"
              style={buttonStyle(activeButtons.includes(i))}
              onClick={() => handleButtonClick(i)}
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
    </form>
  );
};

export default FirstForm;
