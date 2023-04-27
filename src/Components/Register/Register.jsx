import React, { useState } from "react";
import "./Register.css";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "../../Firebase/firebase.config";

const auth = getAuth(app);

const Register = () => {
  const handleSubmit = (event) => {
    //1. prevent page refresh
    event.preventDefault();

    //2. collect form data
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log(email, password);

    //3. create user in firebase
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
        />
        <br />
        <input
          className="w-50"
          onBlur={handlePasswordBlur}
          type="password"
          name="password"
          placeholder="Enter Your password"
        />
        <br />
        <input className="btn btn-primary" type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Register;
