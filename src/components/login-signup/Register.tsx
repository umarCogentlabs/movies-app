import React, { useEffect } from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import "./styles/style.scss";

interface MyFormValues {
  name: string;
  password: string;
}
export default function Register() {
  let navigate = useNavigate();
  const performLogin = () => {
    navigate("../home");
  };

  const handleLoginNavigateClick = () => {
    navigate("../");
  };

  let initialValues: MyFormValues = { name: "", password: "" };
  const [initialValuesState, setInitialValues] = useState(initialValues);

  const appendInLocalStorage = (userInfo: any) => {
    let loginInfo: any = [];
    if (localStorage.getItem("loginInfo")) {
      loginInfo = JSON.parse(localStorage.getItem("loginInfo") || "") || [];
    }
    loginInfo.push(userInfo);

    localStorage.setItem("loginInfo", JSON.stringify(loginInfo));
  };

  const handleRegister = (values: MyFormValues, { resetForm }: any) => {
    resetForm({ values: initialValues });

    const userInfo = {
      username: values.name,
      password: values.password,
    };
    appendInLocalStorage(userInfo);
  };

  const userSchema = Yup.object().shape({
    name: Yup.string().min(4, "Too Short!").required("Username Required"),
    password: Yup.string().min(10, "Too Short!").required("Password Required"),
  });

  useEffect(() => {
    const isUsername = localStorage.getItem("username");
    isUsername && performLogin();
  });

  return (
    <div className="login-form">
      <h1>Register</h1>
      <Formik
        initialValues={initialValuesState}
        enableReinitialize={true}
        validationSchema={userSchema}
        onSubmit={handleRegister}>
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

            <button type="submit"> Register</button>
          </Form>
        )}
      </Formik>

      <p>Already have an account?</p>
      <button onClick={handleLoginNavigateClick} className="register">
        Login
      </button>
    </div>
  );
}
