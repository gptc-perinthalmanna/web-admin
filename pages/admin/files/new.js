import React, {useState} from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "tailwind-toast";

import Admin from "layouts/Admin.js";
import Form from "components/Forms/Form";
import { filesTags } from 'constants/roles'

export default function EditDetails() {
  const router = useRouter();
  const [tags, setTags] = useState([]);

  const formik = useFormik({
    initialValues: {
        title: "",
        description: "",
        url: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(5, "This field must be 5 chars or more")
        .required("This Field is Required"),
        description: Yup.string().min(10, "This field Must be 7 Chars or more"),
        url: Yup.string().url().required()
    }),
    onSubmit: (values) => {
      axios
        .post("/api/admin/files/new/", {
          ...values, tags : tags.map(tag => tag.value),
        })
        .then((res) => {
          toast()
            .success("Great!", "Created new file post!")
            .with({ color: "bg-green-800" })
            .from("bottom", "end")
            .as("pill")
            .show(); //show pill shaped toast
          router.push("/admin/files");
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
            <Form.Title title="New Event">
              <Form.Button />
            </Form.Title>
            <Form.Section title={"Event Details"}>
              <Form.TextInput
                {...formik.getFieldProps("title")}
                label="File Name"
                size="1/2"
              />
              <Form.TextInput
                {...formik.getFieldProps("description")}
                label="File Details"
              />
                <Form.TextInput
                {...formik.getFieldProps("url")}
                label="File URL"
              />
                  <Form.TagsInput
                label="Tags"
                size="1/2"
                onChange={(t) => setTags(t)}
                options={filesTags.map((tag) => ({label: tag.name, value: tag.name}))}
              />
            </Form.Section>
          </Form>
        </div>
      </div>
    </>
  );
}

EditDetails.layout = Admin;
