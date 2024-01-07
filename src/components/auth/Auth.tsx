// Global imports
import { useEffect, useState, useContext, FormEventHandler } from "react";

// Project dependencies
import useApi from "../../hooks/api/useApi";
import AuthContext from "../../store/auth/AuthContextProvider";
import { validatePasswordLength } from "./validations";
import { AuthData } from "../../hooks/api/apiData";
import { useLocation } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const Auth = () => {
  const [authData, setAuthData] = useState<AuthData>();
  const { request, setError } = useApi();
  const { globalLogInDispatch } = useContext(AuthContext);
  const location = useLocation();
  const currentPathArray = location.pathname.split("/");
  const isLogin = currentPathArray[currentPathArray.length - 1] === "login";

  // Upon successful response from the api for login user, dispatch global auth LOG_IN event
  useEffect(() => {
    if (authData) {
      let isAdmin: boolean = false;
      authData.user.roles.forEach(function (role) {
        if (role.authority === "ADMIN") isAdmin = true;
      });
      globalLogInDispatch({
        authToken: authData.jwt,
        userId: authData.user.id,
        username: authData.user.username,
        isAdmin: isAdmin,
      });
    }
  }, [authData, globalLogInDispatch]);

  const authHandler: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // Validations first!
    const username = data.get("username");
    const userPassword = data.get("password");
    try {
      //console.log(username, userPassword);
      if (
        !validatePasswordLength(username?.toString() || "") ||
        !validatePasswordLength(userPassword?.toString() || "")
      ) {
        throw new Error("Incorrect credential format!");
      }
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: userPassword,
        }),
      };

      const endpoint = `/auth/${isLogin ? "login" : "register"}`;
      await request(endpoint, params, setAuthData);
    } catch (error: any) {
      setError(error.message || error);
    }
  };

  return (
    <>
      <h2>{isLogin ? "Log In" : "Sign Up"}</h2>
      {isLogin ? (
        <LoginForm onSubmit={authHandler} />
      ) : (
        <RegisterForm onSubmit={authHandler} />
      )}
    </>
  );
};

export default Auth;
