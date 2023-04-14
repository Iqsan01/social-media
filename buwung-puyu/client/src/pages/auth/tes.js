import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../img/logo1.png";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import { logIn, signUp } from "../../actions/AuthAction";

const Auth = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authReducer.loading);
  const [isSignUp, setIsSignUp] = useState(false);
  const [errors, setErrors] = useState({});

  console.log(loading);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirpass: "",
  });

  const [confirPass, setConfirPass] = useState(true);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      if (isSignUp) {
        data.password === data.confirpass
          ? dispatch(signUp(data))
          : setConfirPass(false);
        setErrors(errors);
      } else {
        dispatch(logIn(data));
      }
    }
  };

  // Validators
  const validatePassword = (password) => {
    //Validasi delapan karakter
    if (password.length < 8) {
      return "Password harus minimal delapan karakter.";
    }

    // Validasi setiap karakter password
    const upperCaseRegex = /[A-Z]/;
    const lowerCaseRegex = /[a-z]/;
    const digitRegex = /\d/;
    const specialCharsRegex = /[!@#$%^&*]/;
    const denailCharsRegex = /[`()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (!upperCaseRegex.test(password)) {
      return "Password harus mengandung setidaknya satu huruf besar.";
    }
    if (!lowerCaseRegex.test(password)) {
      return "Password harus mengandung setidaknya satu huruf kecil.";
    }
    if (!digitRegex.test(password)) {
      return "Password harus mengandung setidaknya satu angka.";
    }
    if (!specialCharsRegex.test(password)) {
      return "Password harus mengandung setidaknya satu karakter khusus.";
    }
    if (denailCharsRegex.test(password)) {
      return "Password tidak boleh mengandung karakter khusus tertentu.";
    }

    return "";
  };

  const validateEmail = (email) => {
    if (!email) {
      return "Email harus diisi.";
    }

    if (!validator.isEmail(email)) {
      return "Email tidak valid!";
    }

    return "";
  };

  const validateForm = () => {
    let errors = {};
    errors.email = validateEmail(data.email);
    errors.password = validatePassword(data.password);
    return errors;
  };

  return (
    <div className="Auth">
      {/* left side  */}
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>Buwung Puyu.</h1>
          <h6>The new social media for developer</h6>
        </div>
      </div>
      {/* Right side SignUp */}
      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "Register" : "Login"}</h3>

          {isSignUp && (
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                onChange={handleChange}
                value={data.firstname}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                onChange={handleChange}
                value={data.lastname}
              />
            </div>
          )}
          <div>
            <input
              type="text"
              className="infoInput"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={data.email}
            />
          </div>
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
          <div>
            <input
              type="password"
              className="infoInput"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={data.password}
            />

            {isSignUp && (
              <input
                type="password"
                className="infoInput"
                name="confirpass"
                placeholder="Confirm Password"
                onChange={handleChange}
                value={data.confirpass}
              />
            )}
          </div>
          {errors.password && (
            <span className="error-message">{errors.password}</span>
          )}
          {confirPass === false && (
            <span
              style={{
                color: "red",
                fontSize: "12px",
                alignSelf: "flex-end",
                marginRight: "5px",
                display: confirPass ? "none" : "block",
              }}
            >
              Password tidak sama!
            </span>
          )}
          <div>
            <span
              style={{
                fontSize: "12px",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => {
                setIsSignUp((prev) => !prev);
              }}
            >
              {isSignUp
                ? "Already have an account. Login!"
                : "Don't have an account? Sign Up"}
            </span>
          </div>
          <button
            className="button infoButton"
            type="submit"
            disabled={loading || !validateForm()}
          >
            {loading ? "loading..." : isSignUp ? "Sign up" : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
