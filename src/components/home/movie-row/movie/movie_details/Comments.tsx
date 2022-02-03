import React from "react";
import { Formik, Form, Field } from "formik";

export default function Comments({ errors, touched }: any) {
  return (
    <>
      <Form>
        <label htmlFor="comment">Comment:</label>
        <Field id="comment" name="comment" placeholder="Comment" />
        {errors.comment && touched.comment ? <div>{errors.comment}</div> : null}

        <button type="submit"> Comment</button>
      </Form>
    </>
  );
}
