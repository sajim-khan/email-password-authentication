import React, { useState } from "react";
import "./Register.css";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth";
import app from "../../Firebase/firebase.config";
import { Link } from "react-router-dom";

const auth = getAuth(app);

const Register = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (event) => {
    //1. prevent page refresh
    event.preventDefault();
    setSuccess("");
    setError("");

    //2. collect form data
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log(email, password);

    //validate
    if (!/(?=.*[A-Z])/.test(password)) {
      setError("Please add at least one upper case");
      return;
    } else if (!/(?=.*[0-9].*[0-9])/.test(password)) {
      setError("Please add at least two numbers");
      return;
    }

    //3. create user in firebase
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        setError("");
        event.target.reset();
        setSuccess("User has been created successfully");
        sendVerificationEmail(result.user)
      })
      .catch((error) => {
        console.error(error.message);
        setError(error.message);
      });
  };
  
  
  // email verification
  const sendVerificationEmail = user => {
    sendEmailVerification(user)
    .then(result => {
      console.log(result);
      alert('Please verify your email address')
    })
  }
  

  const handleEmailChange = (event) => {
    //console.log(event.target.value);
    // setEmail(event.target.value);
  };

  const handlePasswordBlur = (event) => {
    //console.log(event.target.value);
  };

  return (
    <div className="w-50 mx-auto">
      <h2>This is register page</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="w-50"
          onChange={handleEmailChange}
          type="email"
          name="email"
          placeholder="Enter Your Email"
          required
        />
        <br />
        <input
          className="w-50"
          onBlur={handlePasswordBlur}
          type="password"
          name="password"
          placeholder="Enter Your password"
          required
        />
        <br />
        <input className="btn btn-primary" type="submit" value="Register" />
      </form>
      <p>
        Already have an account? Please <Link to='/login'>Login</Link>
      </p>
      <p className="text-danger">{error}</p>
      <p className="text-gray">{success}</p>
    </div>
  );
};

export default Register;
