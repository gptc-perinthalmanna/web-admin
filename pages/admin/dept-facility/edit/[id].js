import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "tailwind-toast";

import { notificationTags } from 'constants/roles'
import Admin from "layouts/Admin.js";
import Form from "components/Forms/Form";
import { fetchData } from "helpers/fetcher";


export default function EditDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [tags, setTags] = useState([]);

  const { data } = fetchData("/api/public/facilities/" + id);

  useEffect(() => {
    setTags(data?.tags.map((tag) => ({ label: tag, value: tag })));
  }, [data]);

  const formik = useFormik({
    initialValues: {
      title: data?.title,
      image: data?.image,
      description: data?.description,
      color: data?.color,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      title: Yup.string()
        .min(3, "This field Must be 3 Chars or more")
        .required("This Field is Required"),
      description: Yup.string()
        .min(40, "This field Must be 40 Chars or more")
        .required("This Field is Required"),
      image: Yup.string().url().required("This Field is Required"),
      color: Yup.string()
        .min(3, "This field Must be 3 Chars or more")
        .required("This Field is Required"),
    }),
    onSubmit: (values) => {
      axios
        .post("/api/admin/dept-facility/edit/", {
          ...values,
          key: data.key,
          tags: tags.map((tag) => tag.value),
        })
        .then((res) => {
          toast()
            .success("Great!", "Saved the details!")
            .with({ color: "bg-blue-800" })
            .from("bottom", "end")
            .as("pill")
            .show(); //show pill shaped toast
          router.push("/admin/dept-facility");
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
            <Form.Title title="Edit Departments Facility">
              <Form.Button />
            </Form.Title>
            <Form.Section title={"Facility Details"}>
              <Form.TextInput
                {...formik.getFieldProps("title")}
                label="Facility Name"
              />
              <Form.TextInput
                {...formik.getFieldProps("image")}
                label="Image Link"
              />
            </Form.Section>
            <Form.Section title={"Description"}>
              <Form.TextArea
                {...formik.getFieldProps("description")}
                label="Facility Description"
              />
              <Form.TagsInput
                label="Tags"
                size="1/2"
                defaultValue={tags}
                value={tags}
                onChange={(t) => setTags(t)}
                options={notificationTags.map((tag) => ({
                  label: tag.name,
                  value: tag.name,
                }))}
              />
            </Form.Section>
            <Form.Section title={"Style"}>
            <Form.TextInput
                {...formik.getFieldProps("color")}
                label="Color"
              />
            </Form.Section>
          </Form>
        </div>
      </div>
    </>
  );
}

EditDetails.layout = Admin;
