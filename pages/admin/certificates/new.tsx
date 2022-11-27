import React, { useState } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "tailwind-toast";

import Admin from "layouts/Admin.js";
import Form from "components/Forms/Form";
import { eventsTags } from "constants/roles";
import { toastError, toastWarning } from "components/toast";
import Modal from "components/Ui/Modal";
import UserSelect from "components/Forms/UserSelect";

const _certificate = {
  key: "3aa9d27c-d46a-4fac-9780-745a1265f19e",
  referance: "0003",
  title: "Orientation programme from of IEDC",
  instructors: [
    {
      id: "custom",
      name: "Sanjay V",
      designation: "Lecturer in Electrical and Electronics Engineering",
      institution: "GPTC Perinthalmanna",
    },
    {
      id: "custom",
      name: "Danishmon",
      designation: "Lecturer in Electrical and Electronics Engineering",
      institution: "GPTC Perinthalmanna",
    },
  ],
  holder: {
    id: "custom",
    name: "Amjed Ali K",
    avatar: "https://img-c.udemycdn.com/user/100x100/48241786_cc5a.jpg",
    designation: "Tradesman in Electronics",
  },
  date: "2 Dec 2021",
  duration: "1 day",
  createdBy: "custom",
  createdAt: 233423243234,
};

type InstructorType = {
  id: string;
  name: string;
  designation: string;
  institution: string;
};

export default function ProgramDetails() {
  const router = useRouter();
  const [image, setimage] = useState(null);
  const [tags, setTags] = useState<{ lable: string; value: string }[]>([]);
  const [rcount, setRcount] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const formik = useFormik({
    initialValues: {
      title: "",
      duration: "",
      date: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(5, "This field Must be 5 Chars or more")
        .required("This Field is Required"),
      duration: Yup.string().min(2, "This field Must be 2 Chars or more"),
      date: Yup.string().required("This Field is Required"),
    }),
    onSubmit: (values) => {
      if (!image && rcount === 0) {
        setRcount(rcount + 1);
        toastWarning("Uploading image.. Retry again.");
      } else {
        setRcount(0);
      }
      axios
        .post("/api/admin/events/new/", {
          ...values,
          image,
          images,
          tags: tags.map((tag) => tag.value),
        })
        .then(() => {
          toast()
            .success("Great!", "Created new event!")
            .with({ color: "bg-green-800" })
            .from("bottom", "end")
            .as("pill")
            .show(); //show pill shaped toast
          router.push("/admin/events");
        })
        .catch((err) => {
          toastError(err.response.data.error);
        });
    },
  });

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4 py-3 mx-auto lg:w-8/12">
          <Form onSubmit={formik.handleSubmit}>
            <Form.Title title="New Program">
              <Form.Button />
            </Form.Title>
            <Form.Section title={"Event Details"}>
              <Form.TextInput
                {...formik.getFieldProps("title")}
                label="Program Title"
                size="1"
              />
              <Form.TextInput
                {...formik.getFieldProps("date")}
                label="Program Date"
                size="1/2"
              />
              <Form.TextInput
                {...formik.getFieldProps("duration")}
                label="Program Duration"
                size="1/3"
              />
              <Form.TagsInput
                label="Tags"
                size="1/2"
                defaultValue={tags}
                onChange={(t) => setTags(t)}
                options={eventsTags.map((tag) => ({
                  label: tag.name,
                  value: tag.name,
                }))}
              />
            </Form.Section>
            <Form.Section title={"Photos"}>
              <Form.Image
                label="Upload Cover Image"
                setUrl={setimage}
                uploadAgain={rcount}
              />
              <Form.MultiImage onChange={setImages} />
            </Form.Section>
          </Form>
        </div>
      </div>
    </>
  );
}

ProgramDetails.layout = Admin;

const InstructorAddModal = ({
  showModal,
  setShowModal,
  addInstructor,
}: {
  showModal: boolean;
  setShowModal: (b: boolean) => void;
  addInstructor: (a: InstructorType) => void;
}) => {
  const [selectedUser, setSelectedUser] = useState<InstructorType>(null);
  return (
    <Modal
      show={showModal}
      title={"Search user to add into page"}
      onClose={() => {
        setSelectedUser(null);
        setShowModal(false);
      }}
      onConfirm={() => {
        if (selectedUser) {
          addInstructor(selectedUser);
        }
        setSelectedUser(null);
        setShowModal(false);
      }}
    >
      <Form.TextInput type="text" label="Position" size="" />
      <UserSelect
        onChange={(e, data) => {
          setSelectedUser(data[e.value]);
        }}
      />
    </Modal>
  );
};
