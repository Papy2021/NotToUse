import { useRef, useState, useEffect, Fragment } from "react";
import Crud from "../CRUD";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Link } from "react-router-dom";

const USER_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [currentUser, setCurrentUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUseFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(currentUser);
    setValidName(result);
  }, [currentUser]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    const match = pwd === matchPwd;
    setValidMatch(match);
    setValidPwd(result);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrorMsg("");
  }, [currentUser, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v1 = USER_REGEX.test(currentUser);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrorMsg(`Invalid password or email format`);
      return;
    }

    const userUrl = "https://localhost:44365/api/v1/Account/register";
    const userData = {
      email: currentUser,
      password: pwd,
      confirmPassword: matchPwd,
    };

    axios
      .post(userUrl, userData)
      .then((response) => {
        console.log(response.data);
        setSuccess(true);
      })
      .catch((error) => {
        if (error.response.data[""]) {
          setErrorMsg(
            `${error.response.data[""]} please use a different Email`
          );
        } else if (error.response.data["ConfirmPassword"]) {
          setErrorMsg(
            `${error.response.data["ConfirmPassword"]} please use a different Email`
          );
        } else if (error.response.data["Email"]) {
          setErrorMsg(
            `${error.response.data["Email"]}  is not a valid email-format`
          );
        } else if (error.response.data["Password"]) {
          setErrorMsg(`${error.response.data["Password"]}  invalid password`);
        }
        console.log(error.response.data);
      });
  };

  return (
    <Fragment>
      {success ? (
        <section>
          <div className="container text-center mt-5">
            <h1 className="text-bg-primary p-2 radiusMode">
              Registration Successful
            </h1>

            <br />
            <span className="line">
              <Link to="/login"> Click here to login</Link>
            </span>
          </div>
        </section>
      ) : (
        <section className="aCCountSection">
          <p
            ref={errRef}
            className={errorMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errorMsg}
          </p>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">
              Username:
              <span className={validName ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validName || !currentUser ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setCurrentUser(e.target.value)}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUseFocus(true)}
              onBlur={() => setUseFocus(false)}
            />
            <p
              id="uidnote"
              className={
                userFocus && currentUser && !validName
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Check the email format.
              <br />
              Must contain the symbole "@" with a domaine part after . .<br />
              Letters, numbers, underscores,hyphens allowed
            </p>

            <label htmlFor="password">
              Password:
              <span className={validPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validPwd || !pwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p
              id="pwdnote"
              className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characteres.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special charactere. <br />
              Allowed special characters:
              <span arial-label="exclamation mark">!</span>
              <span arial-label="at symbol">@</span>
              <span arial-label="dollar sign">$</span>
              <span arial-label="percent">%</span>
            </p>

            <label htmlFor="confirmpwd">
              Confirm Password:
              <span className={validMatch && matchPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="password"
              id="confirmpwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p
              id="confirmnote"
              className={
                matchFocus && !validMatch ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
              <br />
              <br />
            </p>
            <button
              type="submit"
              className="rButton"
              // disabled={!validName || !validPwd || !validMatch ? true : false}
            >
              Submit
            </button>

            <p>
              <br />
              <span className="line">
                You have an account?
                <br />
                <Link to="/login">Sign in</Link>
              </span>
            </p>
          </form>
        </section>
      )}
    </Fragment>
  );
};

export default Register;
