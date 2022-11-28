import React, { useState } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "tailwind-toast";

import Admin from "layouts/Admin.js";
import Form from "components/Forms/Form";
import { toastError, toastSuccess, toastWarning } from "components/toast";
import Modal from "components/Ui/Modal";
import UserSelect from "components/Forms/UserSelect";
import MinimalUserCard from "components/Ui/MinimalUserCard";
import { UserType } from "server/db";
import readXlsxFile from "read-excel-file";

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
  logos: ["link"],
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

const xlsSchema = {
  Name: {
    // JSON object property name.
    prop: "name",
    type: String,
  },
  "Phone Number": {
    prop: "phone",
    type: Number,
    required: true,
  },
  Description: {
    prop: "designation",
    type: String,
  },
};

type HolderInterface = {
  name?: string;
  phone: string;
  description?: string;
};
export default function ProgramDetails() {
  // const router = useRouter();
  const [holders, setHolders] = useState<HolderInterface[]>([]);
  const [fileError, setFileError] = useState(null);
  const [images, setImages] = useState<string[]>([]);
  const [showAddInstructorModal, setShowAddInstructorModal] = useState(false);
  const [instructors, setInstructors] = useState<InstructorType[]>([]);

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
      axios
        .post("/api/", {
          ...values,
          logos: images,
          staffs: instructors,
          holders,
        })
        .then(() => {
          toastSuccess("Added the programme and Generated certificates");
          // router.push("/admin/events");
        })
        .catch((err) => {
          toastError(err.response.data.error);
        });
    },
  });

  const onChangeFIle = (file: File) => {
    readXlsxFile(file, { schema: xlsSchema }).then(({ rows, errors }) => {
      if (errors.length > 0) {
        setFileError(
          `Error: ${errors[0].row} row, ${errors[0].column} column - ${errors[0].reason}`
        );
      }
      setHolders(rows as HolderInterface[]);
    });
  };

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full container px-4 py-3 mx-auto lg:w-8/12">
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
                size="1/2"
              />
            </Form.Section>
            <Form.Section title={"Staffs"}>
              {instructors?.map((currentInstructor) => {
                return (
                  <MinimalUserCard
                    key={currentInstructor?.id}
                    name={currentInstructor.name}
                    description={currentInstructor.designation}
                    onClick={() => {
                      setInstructors(
                        instructors.filter(
                          (e) => e.id !== currentInstructor?.id
                        )
                      );
                    }}
                  />
                );
              })}
              <MinimalUserCard.NewButton
                onClick={() => setShowAddInstructorModal(true)}
              />
            </Form.Section>
            <Form.Section title={"Participants"}>
              <Form.UploadFIle
                onChange={(e) => onChangeFIle(e.target.files[0])}
              />
              {fileError && <span>{fileError}</span>}
            </Form.Section>
            <Form.Section title={"Advanced Settings"}>
              <Form.MultiImage title="Upload Logos" onChange={setImages} />
            </Form.Section>
          </Form>
        </div>
        <InstructorAddModal
          setShowModal={setShowAddInstructorModal}
          showModal={showAddInstructorModal}
          addInstructor={(e) => setInstructors([...instructors, e])}
        />
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
  const [existing, setExisting] = useState(true);

  return (
    <Modal
      show={showModal}
      title={"Add Instructor to the Program"}
      onClose={() => {
        setSelectedUser(null);
        setShowModal(false);
      }}
      onConfirm={() => {
        if (selectedUser) {
          addInstructor({ ...selectedUser, id: selectedUser.id || "custom" });
        }
        setSelectedUser(null);
        setShowModal(false);
      }}
    >
      <div>
        <Form.ToggleSwitch
          checked={existing}
          onChange={(e) => setExisting(e.target.checked)}
          label="Is existing user"
        />
        {existing ? (
          <UserSelect
            onChange={(_, data: UserType) => {
              setSelectedUser({
                id: data.id,
                name: data.name,
                designation: data.designation,
                institution: "GPC Perinthalmanna",
              });
            }}
          />
        ) : (
          <div>
            <Form.TextInput
              value={selectedUser?.name}
              label="Name"
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, name: e.target.value })
              }
            />
            <Form.TextInput
              value={selectedUser?.designation}
              label="Designation"
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser,
                  designation: e.target.value,
                })
              }
            />
            <Form.TextInput
              value={selectedUser?.institution}
              label="Institution"
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser,
                  institution: e.target.value,
                })
              }
            />
          </div>
        )}
      </div>
    </Modal>
  );
};
