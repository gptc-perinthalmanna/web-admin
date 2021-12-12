import React, { useState } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "tailwind-toast";

import Admin from "layouts/Admin.js";
import Form from "components/Forms/Form";

export default function EditDetails() {
  const router = useRouter();
  const [tags, setTags] = useState([]);
  const [expiryDate, setExpiryDate] = useState(
    () => new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000)
  );

  const formik = useFormik({
    initialValues: {
      title: "",
      link: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(5, "This field Must be 5 Chars or more")
        .required("This Field is Required"),
      link: Yup.string().url(),
    }),
    onSubmit: (values) => {
      console.log({
        ...values,
        tags,
        expiryDate,
      });
      axios
        .post("/api/admin/notifications/new/", {
          ...values,
          tags,
          expiryDate: expiryDate.getTime(),
        })
        .then((res) => {
          toast()
            .success("Great!", "Created new notification!")
            .with({ color: "bg-green-800" })
            .from("bottom", "end")
            .as("pill")
            .show(); //show pill shaped toast
          router.push("/admin/notifications");
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
            <Form.Title title="New Notification">
              <Form.Button />
            </Form.Title>
            <Form.Section title={"Notification Details"}>
              <Form.TextInput
                {...formik.getFieldProps("title")}
                label="Notificiation Title"
                size="1/2"
              />
               {formik.touched.title && formik.errors.title ? (
                <Form.Error>{formik.errors.title}</Form.Error>
              ): null}
              <Form.TextInput
                {...formik.getFieldProps("link")}
                label="Notificiation link (optional)"
              />
              {formik.touched.link && formik.errors.link ? (
                <Form.Error>{formik.errors.link}</Form.Error>
              ): null}
              <Form.DatePicker
                label="Expiry Date"
                startDate={expiryDate}
                onChange={(date) => setExpiryDate(date)}
                minDate={new Date()}
              />
              <Form.TextInput
                label="Tags"
                size="1/2"
                onChange={(e) => {
                  setTags([e.target.value]);
                }}
              />
            </Form.Section>
          </Form>
        </div>
      </div>
    </>
  );
}

EditDetails.layout = Admin;
