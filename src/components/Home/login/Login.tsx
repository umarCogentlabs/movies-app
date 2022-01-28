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
export default function Login() {
  let navigate = useNavigate();
  const performLogin = () => {
    navigate("../home");
  };
  //formik states and functions
  let initialValues: MyFormValues = { name: "", password: "" };
  const [initialValuesState, setInitialValues] = useState(initialValues);

  const handleSubmit = (values: MyFormValues, { resetForm }: any) => {
    resetForm({ values: initialValues });
    localStorage.setItem("username", values.name);
    performLogin();
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
    <Formik
      initialValues={initialValuesState}
      enableReinitialize={true}
      validationSchema={userSchema}
      onSubmit={handleSubmit}>
      {({ errors, touched }) => (
        <Form>
          <label htmlFor="name">
            <h4>Name:</h4>
          </label>
          <Field id="name" name="name" placeholder="Name" />
          {errors.name && touched.name ? <div>{errors.name}</div> : null}

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
            <div>{errors.password}</div>
          ) : null}

          <button type="submit"> Login</button>
        </Form>
      )}
    </Formik>
  );
}
