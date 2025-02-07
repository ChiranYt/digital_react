import React from "react";
import "./form.css";
import { useState } from "react";
import FirstForm from "./FirstForm";
import SecondForm from "./SecondForm";
import ThirdForm from "./ThirdForm";
import FourthForm from "./FourthForm";
import LastForm from "./LastForm";
import ThankYou from "./ThankYou";

const Form = () => {
  const [activeButtons, setActiveButtons] = useState([]);
  const [activeBudgetButton, setActiveBudgetButton] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [secondFormSubmitted, setSecondFormSubmitted] = useState(false);
  const [thirdFormSubmitted, setThirdFormSubmitted] = useState(false);
  const [fourthFormSubmitted, setFourthFormSubmitted] = useState(false);
  const [websiteURL, setWebsiteURL] = useState("");
  const [lastStepSubmitted, setLastStepSubmitted] = useState(false);

  const formStyle = {
    maxWidth: "56rem",
    margin: "0 auto",
  };

  const handleButtonClick = (buttonIndex) => {
    setActiveButtons((prevState) =>
      prevState.includes(buttonIndex)
        ? prevState.filter((index) => index !== buttonIndex)
        : [...prevState, buttonIndex]
    );
    setErrorMessage("");
  };

  const handleBudgetButtonClick = (buttonIndex) => {
    setActiveBudgetButton(buttonIndex); // Allow only one active button in the third form
    setErrorMessage("");
  };

  const handleCorrectButtonClick = () => {
    const isValid = validateURL(websiteURL);
    if (!websiteURL || isValid) {
      setWebsiteURL("12.com");
      setErrorMessage(null);
    } else {
      setErrorMessage(
        "Invalid input. Please enter a valid URL like hello.com."
      );
    }
  };

  const validateURL = (url) => {
    const urlPattern = /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/; // Matches something like "hello.com"
    return urlPattern.test(url);
  };

  const buttonStyle = (isActive) => ({
    backgroundColor: isActive ? "#e67e22" : "#FFC04D", // More subtle active orange, lighter inactive
    color: isActive ? "#ffffff" : "rgb(50, 25, 0)", // Better contrast on inactive
    border: "none", // No border
    transition: "transform 0.2s, box-shadow 0.2s, background-color 0.3s", // More transitions
    fontSize: "1.1rem",
    padding: "0.7rem 1.5rem", // Adjusted padding
    minHeight: "40px", // Adjusted min-height
    margin: "0.5rem",
    borderRadius: "5px", // More rounded
    boxShadow: isActive
      ? "0 2px 5px rgba(0, 0, 0, 0.1)"
      : "0 1px 3px rgba(0, 0, 0, 0.1)", // Subtle shadows
    cursor: "pointer",
    ":hover": {
      transform: "scale(1.02)",
      boxShadow: "0 3px 7px rgba(0, 0, 0, 0.15)",
      backgroundColor: isActive ? "#d86200" : "#FFAD42", // Darker hover color
    },
    ":active": {
      transform: "translateY(1px)",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)", // Reset shadow
      backgroundColor: "#CC5A00", // Even darker on click
    },
    ":focus": {
      outline: "none",
      boxShadow: "0 0 0 0.2rem rgba(255, 115, 0, 0.5)", // Orange focus ring
    },
  });

  return (
    <>
      <div className="spacing-2"></div>

      {!formSubmitted ? (
        <FirstForm
          setActiveButtons={setActiveButtons}
          setErrorMessage={setErrorMessage}
          buttonStyle={buttonStyle}
          activeButtons={activeButtons}
          handleButtonClick={handleButtonClick}
          errorMessage={errorMessage}
          formStyle={formStyle}
          setFormSubmitted={setFormSubmitted}
        />
      ) : !secondFormSubmitted ? (
        <SecondForm
          setSecondFormSubmitted={setSecondFormSubmitted}
          setActiveButtons={setActiveButtons}
          setErrorMessage={setErrorMessage}
          formStyle={formStyle}
          buttonStyle={buttonStyle}
          activeButtons={activeButtons}
          handleButtonClick={handleButtonClick}
          errorMessage={errorMessage}
        />
      ) : !thirdFormSubmitted ? (
        <ThirdForm
          setThirdFormSubmitted={setThirdFormSubmitted}
          setActiveButtons={setActiveButtons}
          setErrorMessage={setErrorMessage}
          formStyle={formStyle}
          buttonStyle={buttonStyle}
          activeBudgetButton={activeBudgetButton}
          handleBudgetButtonClick={handleBudgetButtonClick}
          errorMessage={errorMessage}
        />
      ) : !fourthFormSubmitted ? (
        <FourthForm
          formStyle={formStyle}
          errorMessage={errorMessage}
          handleCorrectButtonClick={handleCorrectButtonClick}
          websiteURL={websiteURL}
          setWebsiteURL={setWebsiteURL}
          setErrorMessage={setErrorMessage}
          setFourthFormSubmitted={setFourthFormSubmitted}
        />
      ) : !lastStepSubmitted ? (
        <LastForm
          formStyle={formStyle}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          setLastStepSubmitted={setLastStepSubmitted}
        />
      ) : (
        <ThankYou formStyle={formStyle} />
      )}
    </>
  );
};

export default Form;
