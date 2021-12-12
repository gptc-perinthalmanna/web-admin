import React, {useState} from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "tailwind-toast";

import Admin from "layouts/Admin.js";
import Form from "components/Forms/Form";
import { eventsTags } from "constants/roles"

export default function EditDetails() {
  const router = useRouter();
  const [image, setimage] = useState(null)
  const [tags, setTags] = useState([]);

  const formik = useFormik({
    initialValues: {
        title: "",
        subtitle: "",
        date: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(5, "This field Must be 5 Chars or more")
        .required("This Field is Required"),
      subtitle: Yup.string().min(7, "This field Must be 7 Chars or more"),
      date: Yup.string().required("This Field is Required"),
    }),
    onSubmit: (values) => {
      axios
        .post("/api/admin/events/new/", {
          ...values, image, tags : tags.map(tag => tag.value)
        })
        .then((res) => {
          toast()
            .success("Great!", "Created new event!")
            .with({ color: "bg-green-800" })
            .from("bottom", "end")
            .as("pill")
            .show(); //show pill shaped toast
          router.push("/admin/events");
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
                label="Event Title"
                size="1/2"
              />
              <Form.TextInput
                {...formik.getFieldProps("subtitle")}
                label="Event Subtitle"
              />
                <Form.TextInput
                {...formik.getFieldProps("date")}
                label="Event Date"
                size="1/3"
              />
               <Form.TagsInput
                label="Tags"
                size="1/2"
                defaultValue={tags}
                onChange={(t) => setTags(t)}
                options={eventsTags.map((tag) => ({label: tag.name, value: tag.name}))}
              />
            </Form.Section>
            <Form.Section title={"Photos"}>
            <Form.Image setUrl={setimage}  />
            </Form.Section>
          </Form>
        </div>
      </div>
    </>
  );
}

EditDetails.layout = Admin;
