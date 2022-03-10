import React, { createContext, useState } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [auth, setAuth] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkAuth(values);
    setValues({
      username: "",
      password: "",
    });
  };

  const checkAuth = (data) => {
    if (data.username === "admin123" && data.password === "admin123") {
      sessionStorage.setItem("dummy_token", "eadkjxlAXNIASNjdankjnncasdhbcaxncABLHDSB");
      setAuth(true);
    } else {
      setError(true);
      setInterval(() => {
        setError(false);
      }, [5000]);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("dummy_token");
    setAuth(false);
  };

  const verifyLogin = () => {
    if (sessionStorage.getItem("dummy_token") === null) {
      setAuth(false);
    }
  };
  return <LoginContext.Provider value={{ handleLogout, error, setError, verifyLogin, auth, setAuth, handleSubmit, values, setValues, handleChange }}>{children}</LoginContext.Provider>;
};
