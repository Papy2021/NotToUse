import { useRef, useState, useEffect, Fragment, useContext } from "react";
import axios from "axios";
import Crud from "../CRUD.jsx";
import { LoginContext } from "../Helper/Context.jsx";
import {Link} from "react-router-dom";

const Login = () => {
  const { loggedIn, setLoggedIn } = useContext(LoginContext);

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // useEffect(() => {
  //   userRef.current.focus()
  // },[])

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const loginUrl = "https://localhost:44365/api/v1/Account/login";
    const loginData = {
      username: user,
      password: pwd,
    };

    axios
      .post(loginUrl, loginData)
      .then((response) => {
        setLoggedIn(response.data);
          setUser("");
        setPwd("");
        console.log(`The Token Is ${loggedIn}`);
        setSuccess(true);
   
      })
      .catch((error) => {
        setErrMsg(error.response.data);
        console.log(error.reponse.data);
      });
  };

  return (
    <Fragment>
      {success ? (
        <section>
          {/* <h1>Succeed</h1> */}
          <Crud></Crud>
        </section>
      ) : (
        <section className="aCCountSection">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="=assertive"
          >
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="Password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />

            <button className="rButton">Sign in</button>
          </form>
          <p>
            Need an Account?
            <br />
            <span className="line">
              <Link to="/register">Register</Link>
            </span>
          </p>
        </section>
      )}
    </Fragment>
  );
};
export default Login;
