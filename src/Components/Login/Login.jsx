import React, { useState } from "react";

const Login = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    setSuccess("");
    setError("");

    const form = event.target;
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
    } else if (!/(?=.*[!@#$%&*])/.test(password)) {
      setError("Please add at least one character");
      return;
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <form className="w-25" onSubmit={handleLogin}>
        <h3>Please Login</h3>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            name="email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            name="password"
            required
          />
        </div>

        <div className="form-check mb-3">
          <input type="checkbox" className="form-check-input" id="rememberMe" />
          <label className="form-check-label" htmlFor="rememberMe">
            Remember me
          </label>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <p className="text-danger">{error}</p>
        <p className="text-success">{success}</p>
      </form>
    </div>
  );
};

export default Login;
