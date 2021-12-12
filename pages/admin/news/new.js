import React, {useState} from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "tailwind-toast";

import Admin from "layouts/Admin.js";
import Form from "components/Forms/Form";

export default function EditDetails() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
        title: "",
        description: "",
        date: "",
        url: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(5, "This field Must be 5 Chars or more")
        .required("This Field is Required"),
      description: Yup.string().min(7, "This field Must be 7 Chars or more"),
      date: Yup.string().required("This Field is Required"),
      url: Yup.string().url(),
    }),
    onSubmit: (values) => {
      axios
        .post("/api/admin/news/new/", {
          ...values
        })
        .then((res) => {
          toast()
            .success("Great!", "Created new event!")
            .with({ color: "bg-green-800" })
            .from("bottom", "end")
            .as("pill")
            .show(); //show pill shaped toast
          router.push("/admin/news");
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  });

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4 py-3 mx-auto lg:w-8/12">
          <Form onSubmit={formik.handleSubmit}>
            <Form.Title title="New News & Media Post">
              <Form.Button />
            </Form.Title>
            <Form.Section title={"News Details"}>
              <Form.TextInput
                {...formik.getFieldProps("title")}
                label="News Title"
                size="1/2"
              />
              {formik.touched.title && formik.errors.title ? (
                <Form.Error>{formik.errors.title}</Form.Error>
              ): null}
              <Form.TextArea
                {...formik.getFieldProps("description")}
                label="News Content"
              />
              {formik.touched.description && formik.errors.description ? (
                <Form.Error>{formik.errors.description}</Form.Error>
              ): null}
                <Form.TextInput
                {...formik.getFieldProps("date")}
                label="News Date"
                size="1/3"
              />
             {formik.touched.date && formik.errors.date ? (
                <Form.Error>{formik.errors.date}</Form.Error>
              ): null}
              <Form.TextInput
                {...formik.getFieldProps("url")}
                label="External Url (optional)"
                size="1/2"
              />
              {formik.touched.url && formik.errors.url ? (
                <Form.Error>{formik.errors.url}</Form.Error>
              ): null}
            </Form.Section>
          
          </Form>
        </div>
      </div>
    </>
  );
}

EditDetails.layout = Admin;
