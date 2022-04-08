import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { signupUser, signinUser } from "../graphql/mutation";
import { redirect } from "../middleware/build";

const Registerform = () => {
  const [flip, setFlip] = useState("");
  const [unflip, setUnflip] = useState("signin");
  const [signinInputs, setSigninInputs] = useState({});
  const [signupInputs, setSignupInputs] = useState({});

  const [SignupUser, { loading: l1, error: e1, data: d1 }] = useMutation(
    signupUser,
    {
      variables: { newUser: { ...signupInputs } },
    }
  );

  const [SigninUser, { loading: l2, error: e2, data: d2 }] = useMutation(
    signinUser,
    {
      variables: { confirmUser: { ...signinInputs } },
    }
  );

  const handleClick = (e) => {
    setFlip(e.target.dataset.from);
    setUnflip(e.target.dataset.to);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (unflip === "signin")
      setSigninInputs((values) => ({ ...values, [name]: value }));
    if (unflip === "signup")
      setSignupInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (unflip === "signin") SigninUser();
    if (unflip === "signup") SignupUser();
  };

  setTimeout(() => {
    if (d1) {
      setFlip("signup");
      setUnflip("signin");
    }
  }, 1000);

  if (d2) {
    localStorage.setItem("userId", d2.signinUser.userId);
    localStorage.setItem("token", d2.signinUser.token);
    localStorage.setItem("verified", d2.signinUser.verified);
    localStorage.setItem("groupId", d2.signinUser.groupId);
    redirect();
  }

  if (e1) console.log(e1);
  if (e2) console.log(e2);

  return (
    <div className="container mt-3 d-flex justify-content-center flex-row">
      <div
        className={`box border border-light shadow-lg p-3 p-md-5 mx-auto ${
          flip === "signin" && "flip"
        } ${unflip === "signin" && "unflip"}`}
      >
        {d2 && (
          <div className="alert alert-success alert-dismissible">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
            ></button>
            <strong>Success!</strong> You've logged in successfully.
          </div>
        )}
        {e2 && (
          <div className="alert alert-danger alert-dismissible">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
            ></button>
            <strong>Error!</strong> {e2.message}
          </div>
        )}
        <h2 className="text-center text-light">Sign In</h2>
        <p>
          Don't have an account?
          <br />
          <span
            data-to="signup"
            data-from="signin"
            onClick={handleClick}
            className="text-light"
          >
            Sign Up
          </span>
        </p>
        <button
          className="btn btn-light my-3"
          type="button"
          style={{ width: "100%" }}
        >
          Sign in with google
        </button>
        <div className="d-flex justify-content-between text-light">
          <hr style={{ margin: ".8rem 0", width: "45%" }} />
          <p>or</p>
          <hr style={{ margin: ".8rem 0", width: "45%" }} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 mt-1">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              name="email"
              value={signinInputs.email || ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="pwd">Password:</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              name="password"
              value={signinInputs.password || ""}
              onChange={handleChange}
            />
          </div>
          <button
            className="btn btn-light mt-2"
            type="submit"
            style={{ width: "100%" }}
          >
            {l2 && <span className="spinner-border spinner-border-sm"></span>}
            Sign In
          </button>
        </form>
        <p
          data-to="forgotpwd"
          data-from="signin"
          onClick={handleClick}
          className="text-light"
        >
          Forgot password
        </p>
      </div>

      <div
        className={`box border border-light shadow-lg p-3 p-md-5 mx-auto ${
          flip === "signup" && "flip"
        } ${unflip === "signup" && "unflip"}`}
      >
        {d1 && (
          <div className="alert alert-success alert-dismissible">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
            ></button>
            <strong>Success!</strong> You've signup successfully.
          </div>
        )}
        {e1 && (
          <div className="alert alert-danger alert-dismissible">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
            ></button>
            <strong>Error!</strong> {e1.message}
          </div>
        )}
        <h2 className="text-center text-light">Sign Up</h2>
        <p>
          Already have an account?
          <br />
          <span
            data-to="signin"
            data-from="signup"
            onClick={handleClick}
            className="text-light"
          >
            Sign In
          </span>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 mt-3">
            <label htmlFor="email">Full name:</label>
            <input
              type="fname"
              className="form-control"
              placeholder="Firstname    Lastname"
              name="fullname"
              required
              value={signupInputs.fullname || ""}
              onChange={handleChange}
            />
            <div className="valid-feedback">Valid.</div>
            <div className="invalid-feedback">Enter a valid email.</div>
          </div>
          <div className="mb-3 mt-3">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              name="email"
              required
              value={signupInputs.email || ""}
              onChange={handleChange}
            />
            <div className="valid-feedback">Valid.</div>
            <div className="invalid-feedback">Enter a valid email.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="pwd">Password:</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              name="password"
              required
              value={signupInputs.password || ""}
              onChange={handleChange}
            />
            <div className="valid-feedback">Valid.</div>
            <div className="invalid-feedback">Enter a valid email.</div>
          </div>
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              name="remember"
              required
            />
            <label className="form-check-label">
              By signing up, I agree to the terms and conditions.
            </label>
          </div>
          <button
            className="btn btn-light mt-2"
            type="submit"
            style={{ width: "100%" }}
          >
            {l1 && (
              <span className="spinner-border spinner-border-sm me-2"></span>
            )}
            Sign Up
          </button>
        </form>
        <p
          data-to="forgotpwd"
          data-from="signup"
          onClick={handleClick}
          className="text-light"
        >
          Forgot password
        </p>
      </div>

      <div
        className={`box border border-light shadow-lg p-5 mx-auto ${
          flip === "forgotpwd" && "flip"
        } ${unflip === "forgotpwd" && "unflip"}`}
      >
        <h2 className="text-center text-light">Forgot password</h2>
        <p>
          Enter your email to recieve a password reset link...
          <br />
          <span className="text-light disable">Forgot email?</span>
        </p>
        <form>
          <div className="mb-3 mt-1">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              name="email"
            />
          </div>
          <button
            className="btn btn-light mt-2"
            type="button"
            style={{ width: "100%" }}
          >
            Send Reset span
          </button>
        </form>
        <p
          data-to="signin"
          data-from="forgetpwd"
          onClick={handleClick}
          className="text-light"
        >
          Back to Sign In
        </p>
      </div>
    </div>
  );
};

export default Registerform;
