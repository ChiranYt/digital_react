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
    backgroundColor: isActive ? "#28a745" : "#d4edda",
    color: isActive ? "#ffffff" : "#155724",
    border: `1px solid ${isActive ? "#1b5e20" : "#28a745"}`,
    transition: "opacity 0.5s",
    fontSize: "1.1rem",
    padding: "0.6rem 1.25rem",
    minHeight: "36px",
    margin: "0.5rem",
    borderRadius: "2px",
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
