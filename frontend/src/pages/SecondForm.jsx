import React from "react";

const SecondForm = ({
  setSecondFormSubmitted,
  activeButtons,
  handleButtonClick,
  buttonStyle,
  setActiveButtons,
  setErrorMessage,
  errorMessage,
  formStyle,
  setFormData,
}) => {
  const buttonLabels = [
    "Increase revenue",
    "Increase profit",
    "Get more conversions",
    "Lower my acquisition cost",
    "Improve my ROI",
    "All of the above",
    "Other",
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (activeButtons.length === 0) {
      setErrorMessage("You must choose at least one goal to continue.");
      return;
    }

    const selectedLabels = activeButtons.map((i) => buttonLabels[i]);
    setFormData((prev) => ({
      ...prev,
      clientGoal: selectedLabels.join(", "),
    }));

    setSecondFormSubmitted(true);
    setActiveButtons([]);
    setErrorMessage("");
  };

  return (
    <form onSubmit={handleFormSubmit} style={formStyle}>
      <div className="form-div">
        <div className="text-div">
          <h2>What are your goals?</h2>
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
    </form>
  );
};

export default SecondForm;
