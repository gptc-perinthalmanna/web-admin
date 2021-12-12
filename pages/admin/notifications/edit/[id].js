import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "tailwind-toast";

import { fetchData } from "helpers/fetcher";
import Admin from "layouts/Admin.js";
import Form from "components/Forms/Form";
import { notificationTags } from 'constants/roles'

export default function EditDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = fetchData("/api/public/notifications/" + id);
  const [tags, setTags] = useState([]);
  const [expiryDate, setExpiryDate] = useState(
    () => new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000)
  );

  useEffect(() => {
    if (data) {
      setExpiryDate(new Date(data.expiryDate));
      setTags(data.tags.map((tag) => ({label:tag, value:tag})));
    }
  }, [data]);

  const formik = useFormik({
    initialValues: {
      title: data?.title,
      link: data?.link,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      title: Yup.string()
        .min(5, "This field Must be 5 Chars or more")
        .required("This Field is Required"),
      link: Yup.string().url(),
    }),
    onSubmit: (values) => {
      axios
        .post("/api/admin/notifications/edit/", {
          ...data,
          ...values,
          tags : tags.map(tag => tag.value),
          expiryDate: expiryDate.getTime(),
        })
        .then((res) => {
          toast()
            .success("Great!", "Updated the notification!")
            .with({ color: "bg-yellow-800" })
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
            <Form.Title title="Edit Notification">
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
              ) : null}
              <Form.TextInput
                {...formik.getFieldProps("link")}
                label="Notificiation link (optional)"
              />
              {formik.touched.link && formik.errors.link ? (
                <Form.Error>{formik.errors.link}</Form.Error>
              ) : null}
              <Form.DatePicker
                label="Expiry Date"
                startDate={expiryDate}
                onChange={(date) => setExpiryDate(date)}
                minDate={new Date()}
              />
               <Form.TagsInput
                label="Tags"
                defaultValue={tags}
                onChange={(t) => setTags(t)}
                options={notificationTags.map((tag) => ({label: tag.name, value: tag.name}))}
              />
            </Form.Section>
          </Form>
        </div>
      </div>
    </>
  );
}

EditDetails.layout = Admin;
