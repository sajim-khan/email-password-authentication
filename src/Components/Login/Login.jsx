import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import app from "../../Firebase/firebase.config";
import { Link } from "react-router-dom";

const auth = getAuth(app);

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
    } else if (password.length < 6) {
      setError("Password should be 6 characters long");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        //alert for verify
        if (!loggedUser.emailVerified) {
          alert("Please verify your email");
        }

        event.target.reset();
        setSuccess("User Logged In successfully");
      })
      .catch((error) => {
        //console.error(error.message);
        setError(error.message);
      });
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
        <p>
          New to this website? Please <Link to="/register">Register</Link>
        </p>
        <p className="text-danger">{error}</p>
        <p className="text-success">{success}</p>
      </form>
    </div>
  );
};

export default Login;
