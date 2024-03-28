import React, { useState } from "react";
import { registerUser } from "./utils/api";
import WebCamCapture from "./WebCamCapture";

const AuthForm = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    phone: "",
  });

  const handleToggleAuthMode = () => {
    setIsRegistering((prevState) => !prevState);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        await registerUser(formData);
      } else {
        // For login, redirect to the webcam capture component
        onLogin();
      }
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  return (
    <div>
      <h2>{isRegistering ? "Register" : "Login"} Form</h2>
      <form onSubmit={handleFormSubmit}>
        {isRegistering && (
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              required
            />
            <label htmlFor="age">Age:</label>
            <input
              type="text"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleFormChange}
              required
            />
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleFormChange}
              required
            />
          </div>
        )}
        {!isRegistering && <WebCamCapture />}
        {/* Render webcam component for login */}
        <div>
          <button type="submit">{isRegistering ? "Register" : "Login"}</button>
          <button type="button" onClick={handleToggleAuthMode}>
            {isRegistering
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;