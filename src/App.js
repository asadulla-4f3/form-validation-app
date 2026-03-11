import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isNameValid, setIsNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);

  const isFormValid =
    isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid;
  const [errorMsg, setErrorMsg] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (e.target.value.length === 0) {
      setErrorMsg({ ...errorMsg, name: "Name is required" });
      setIsNameValid(false);
    } else {
      setErrorMsg({ ...errorMsg, name: "" });
      setIsNameValid(true);
    }
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (e.target.value.length === 0) {
      setErrorMsg({ ...errorMsg, email: "Email is required" });
      setIsEmailValid(false);
    } else if (
      e.target.value.length > 0 &&
      !/\S+@\S+\.\S+/.test(e.target.value)
    ) {
      setErrorMsg({ ...errorMsg, email: "Email is invalid" });
      setIsEmailValid(false);
    } else {
      setErrorMsg({ ...errorMsg, email: "" });
      setIsEmailValid(true);
    }
  };
  // Password and confirm password must match and should have at least 6 characters
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length === 0) {
      setErrorMsg({ ...errorMsg, password: "Password is required" });
      setIsPasswordValid(false);
    } else {
      setErrorMsg({ ...errorMsg, password: "" });
      setIsPasswordValid(true);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value.length === 0) {
      setErrorMsg({
        ...errorMsg,
        confirmPassword: "Please confirm your password",
      });
      setIsConfirmPasswordValid(false);
    } else {
      setErrorMsg({ ...errorMsg, confirmPassword: "" });
      setIsConfirmPasswordValid(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMsg({ ...errorMsg, confirmPassword: "Passwords do not match" });
    } else if (password.length < 6) {
      setErrorMsg({
        ...errorMsg,
        password: "Password must be at least 6 characters long",
      });
    } else {
      setErrorMsg({
        ...errorMsg,
        password: "",
        confirmPassword: "",
      });

      alert("Form submitted successfully!");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Registration form</h1>
      </header>
      <h2 className="sub-heading">Enter your details:</h2>
      <div className="form-container">
        <form className="register-form" onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="name">Name:</label>
            <div className="input-container">
              <input
                className="name"
                id="name"
                name="name"
                type="text"
                placeholder="Please Enter Your Name"
                value={name}
                onChange={handleNameChange}
              />
              {errorMsg.name ? (
                <p className="errorMsg">{errorMsg.name}</p>
              ) : null}
            </div>
          </div>
          <div className="form-field">
            <label htmlFor="emailId">EmailId:</label>
            <div className="input-container">
              <input
                className="emailId"
                id="emailId"
                name="emailId"
                type="email"
                placeholder="Eg: abcd@domain.com"
                value={email}
                onChange={handleEmailChange}
              />
              {errorMsg.email ? (
                <p className="errorMsg">{errorMsg.email}</p>
              ) : null}
            </div>
          </div>
          <div className="form-field">
            <label htmlFor="password">Enter Password:</label>
            <div className="input-container">
              <input
                className="password"
                id="password"
                name="password"
                type="password"
                placeholder="Enter a password"
                value={password}
                onChange={handlePasswordChange}
              />
              {errorMsg.password ? (
                <p className="errorMsg">{errorMsg.password}</p>
              ) : null}
            </div>
          </div>
          <div className="form-field">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <div className="input-container">
              <input
                className="confirmPassword"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              {errorMsg.confirmPassword ? (
                <p className="errorMsg">{errorMsg.confirmPassword}</p>
              ) : null}
            </div>
          </div>
          <div className="div-submit">
            <button
              id="submit"
              className="submitBtn"
              disabled={!isFormValid}
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
