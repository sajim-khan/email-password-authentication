import React, { useState } from "react";
import "./Register.css";

const Register = () => {
//   const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log(email, password);
  };

  const handleEmailChange = (event) => {
    //console.log(event.target.value);
    // setEmail(event.target.value);
  };

  const handlePasswordBlur = (event) => {
    //console.log(event.target.value);
  };

  return (
    <div>
      <h2>This is register page</h2>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleEmailChange}
          type="email"
          name="email"
          placeholder="Enter Your Email"
        />
        <br />
        <input
          onBlur={handlePasswordBlur}
          type="password"
          name="password"
          placeholder="Enter Your password"
        />
        <br />
        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Register;
