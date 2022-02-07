import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

interface MyFormValues {
  comment: string;
}

export default function Comments({ handleComment }: any) {
  let initialValues: MyFormValues = { comment: "" };
  const [initialValuesState, setInitialValues] = useState(initialValues);

  const CommentSchema = Yup.object().shape({
    comment: Yup.string()
      .min(5, "Too Short!")
      .required("Comment field cannot be empty"),
  });

  return (
    <>
      <Formik
        initialValues={initialValuesState}
        enableReinitialize={true}
        validationSchema={CommentSchema}
        onSubmit={handleComment}>
        {({ errors, touched }) => (
          <Form>
            <label htmlFor="comment">Comment:</label>
            <Field id="comment" name="comment" placeholder="Comment" />
            {errors.comment && touched.comment ? (
              <div>{errors.comment}</div>
            ) : null}

            <button type="submit"> Comment</button>
          </Form>
        )}
      </Formik>
    </>
  );
}
