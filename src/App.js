import React, { useState } from 'react';
import './App.css'; // Or './styles.css' if that's what you named it

// Make sure these paths match your file structure
import QuestionnaireForm from './pages/form'; 
import SuccessPage from './pages/success';

function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ⭐️ THIS IS THE UPDATED FUNCTION ⭐️
  // It is now 'async' and handles the API POST request
  const handleFormSubmit = async (formData) => {
    console.log("Form Data to be sent:", formData);

    try {
      const response = await fetch('https://dev-api.dream60.com/priceMart/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Convert the form data to a JSON string
      });

      if (response.ok) {
        // The API call was successful
        console.log("Form submitted successfully!");
        setIsSubmitted(true); // Show the success page
      } else {
        // The API call failed (e.g., 404, 500 error)
        console.error("Form submission failed.");
        alert('Submission failed. Please try again.');
      }
    } catch (error) {
      // A network error occurred
      console.error("Error submitting form:", error);
      alert('An error occurred. Please check your connection and try again.');
    }
  };

  // This function will be called from the success page to reset the app
  const handleReset = () => {
    setIsSubmitted(false);
  };

  return (
    <div className="app-container">
      {!isSubmitted ? (
        <QuestionnaireForm onSubmit={handleFormSubmit} />
      ) : (
        <SuccessPage onReset={handleReset} />
      )}
    </div>
  );
}

export default App;