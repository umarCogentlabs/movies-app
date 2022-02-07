import React, { useEffect } from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import "./styles/style.scss";

interface LoginFormValues {
  name: string;
  password: string;
}
export default function Login() {
  let navigate = useNavigate();
  let initialFormValues: LoginFormValues = { name: "", password: "" };
  const [initialValues, setInitialValues] = useState(initialFormValues);

  const performLogin = () => {
    navigate("../home");
  };

  const handleRegisterNavigateClick = () => {
    navigate("../register");
  };

  const validateLoginInfo = (values: any) => {
    let isLoginMatched = false;
    let loginInfo: any = [];

    if (localStorage.getItem("loginInfo")) {
      loginInfo = JSON.parse(localStorage.getItem("loginInfo") || "") || [];
      loginInfo.forEach((login: any) => {
        if (
          login.username === values.name &&
          login.password === values.password
        ) {
          isLoginMatched = true;
        }
      });
    }
    return isLoginMatched;
  };

  const handleSubmit = (values: LoginFormValues, { resetForm }: any) => {
    resetForm({ values: initialValues });
    if (validateLoginInfo(values)) {
      localStorage.setItem("username", values.name);
      performLogin();
    } else {
      alert("username or password not match");
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(4, "Too Short!").required("Username Required"),
    password: Yup.string().min(10, "Too Short!").required("Password Required"),
  });

  useEffect(() => {
    const isUsername = localStorage.getItem("username");
    isUsername && performLogin();
  }, []);

  return (
    <div className="login-form">
      <h1>LogIn</h1>

      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({ errors, touched }) => (
          <Form className="form">
            <label htmlFor="name">
              <h4>Name:</h4>
            </label>
            <Field id="name" name="name" placeholder="Name" />
            {errors.name && touched.name ? (
              <div className="errors">{errors.name}</div>
            ) : null}

            <label htmlFor="password">
              <h4>Password:</h4>
            </label>
            <Field
              id="password"
              name="password"
              type="password"
              placeholder="password"
            />
            {errors.password && touched.password ? (
              <div className="errors">{errors.password}</div>
            ) : null}

            <button type="submit"> Login</button>
          </Form>
        )}
      </Formik>

      <p className="alternative">Dont have an account?</p>
      <button onClick={handleRegisterNavigateClick} className="register">
        Register
      </button>
    </div>
  );
}
