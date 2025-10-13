import React, { useState } from "react";
import "./form.css";
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
  const [secondFormSubmitted, setSecondFormSubmitted] = useState(false);
  const [thirdFormSubmitted, setThirdFormSubmitted] = useState(false);
  const [fourthFormSubmitted, setFourthFormSubmitted] = useState(false);
  const [lastStepSubmitted, setLastStepSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [websiteURL, setWebsiteURL] = useState("");

  const [formData, setFormData] = useState({
    clientNeed: "",
    clientGoal: "",
    clientBudget: "",
    clientSiteURL: "",
    personalInfo: { name: "", email: "", phone: "" },
  });

  const formStyle = { maxWidth: "56rem", margin: "0 auto" };

  const handleButtonClick = (buttonIndex) => {
    setActiveButtons((prev) =>
      prev.includes(buttonIndex)
        ? prev.filter((i) => i !== buttonIndex)
        : [...prev, buttonIndex]
    );
    setErrorMessage("");
  };

  const handleBudgetButtonClick = (buttonIndex) => {
    setActiveBudgetButton(buttonIndex);
    setErrorMessage("");
  };

  const handleCorrectButtonClick = () => {
    const isValid = /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/.test(websiteURL);
    if (!websiteURL || isValid) {
      setWebsiteURL("12.com");
      setFormData((prev) => ({ ...prev, clientSiteURL: "12.com" }));
      setErrorMessage(null);
    } else {
      setErrorMessage(
        "Invalid input. Please enter a valid URL like hello.com."
      );
    }
  };

  const submitAllData = async (dataToSubmit) => {
    const backendUrl =
      process.env.NODE_ENV === "production"
        ? "https://digital-marketing-backend-sry7.onrender.com"
        : "http://localhost:3000";

    try {
      console.log("Submitting form data:", dataToSubmit);

      const response = await fetch(`${backendUrl}/save-all`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSubmit),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.message || "Failed to submit form data.");
      }
      return true;
    } catch (err) {
      console.error("Form submission error:", err);
      setErrorMessage(err.message);
      return false;
    }
  };

  const handleLastStepSubmit = async (updatedFormData) => {
    const {
      clientNeed,
      clientGoal,
      clientBudget,
      clientSiteURL,
      personalInfo,
    } = updatedFormData;

    if (
      !clientNeed?.trim() ||
      !clientGoal?.trim() ||
      !clientBudget?.trim() ||
      !clientSiteURL?.trim() ||
      !personalInfo?.name?.trim() ||
      !personalInfo?.email?.trim() ||
      !personalInfo?.phone?.trim()
    ) {
      setErrorMessage("Please fill all required fields before submitting.");
      return;
    }

    // ✅ Show ThankYou immediately
    setLastStepSubmitted(true);

    // ✅ Submit in background
    submitAllData(updatedFormData).catch((err) => {
      console.error("Background submission failed:", err);
      // Optionally show a toast or log error silently
    });
  };

  const buttonStyle = (isActive) => ({
    backgroundColor: isActive ? "#e67e22" : "#FFC04D",
    color: isActive ? "#ffffff" : "rgb(50, 25, 0)",
    border: "none",
    transition: "transform 0.2s, box-shadow 0.2s, background-color 0.3s",
    fontSize: "1.1rem",
    padding: "0.7rem 1.5rem",
    minHeight: "40px",
    margin: "0.5rem",
    borderRadius: "5px",
    boxShadow: isActive
      ? "0 2px 5px rgba(0, 0, 0, 0.1)"
      : "0 1px 3px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
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
          setFormData={setFormData}
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
          setFormData={setFormData}
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
          setFormData={setFormData}
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
          setFormData={setFormData}
        />
      ) : !lastStepSubmitted ? (
        <LastForm
          formStyle={formStyle}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          setFormData={setFormData}
          handleLastStepSubmit={handleLastStepSubmit}
        />
      ) : (
        <ThankYou formStyle={formStyle} />
      )}
    </>
  );
};

export default Form;
