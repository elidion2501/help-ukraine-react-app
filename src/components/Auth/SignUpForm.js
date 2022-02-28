import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/store/auth-slice";
import classes from "./LoginForm.module.scss";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const history = useNavigate();
  const dispatch = useDispatch();

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };
  const passwordConfirmationChangeHandler = (event) => {
    setPasswordConfirmation(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    fetch("http://127.0.0.1:8000/api/auth/signUp", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        name: email,
        password: password,
        password_confirmation: passwordConfirmation,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data.data.token);
        dispatch(authActions.login(data.data.token));
        history("/home");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className={classes.login__form}>
      <form onSubmit={submitHandler}>
        <div className="mb-3 row">
          <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="staticEmail"
              value={email}
              onChange={emailChangeHandler}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              value={password}
              onChange={passwordChangeHandler}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
            Password Confirmation
          </label>
          <div className="col-sm-10">
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              value={passwordConfirmation}
              onChange={passwordConfirmationChangeHandler}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
