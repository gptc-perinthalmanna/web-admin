import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {toast } from 'tailwind-toast'

import Admin from "layouts/Admin.js";
import Form from "components/Forms/Form";
import { fetchData } from "helpers/fetcher";
import DynamicUserCard from "components/Ui/DynamicUserCard";
import Modal from "components/Ui/Modal";
import UserSelect from "components/Forms/UserSelect";

export default function EditDetails() {
  const [staffIds, setStaffIds] = useState(() => []);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(() => null);

  const router = useRouter();
  const { id } = router.query;
  const { data } = fetchData("/api/public/pages/campus/" + id);

  useEffect(() => {
    setStaffIds(data?.staffs_ids);
  }, [data]);

  const formik = useFormik({
    initialValues: {
      title: data?.title,
      cover: data?.cover,
      about: data?.about,
      staffs_ids: data?.staffs_ids,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      title: Yup.string()
        .min(3, "This field Must be 3 Chars or more")
        .required("This Field is Required"),
      about: Yup.string()
        .min(40, "This field Must be 40 Chars or more")
        .required("This Field is Required"),
      cover: Yup.string().url().required("This Field is Required"),
    }),
    onSubmit: (values) => {
      axios
        .post("/api/admin/campus/edit/", {
          ...values,
          key: data.key,
          staffs_ids: staffIds,
        })
        .then((res) => {
          toast().success('Great!', 'Saved the details!').with({color: 'bg-blue-800'}).from('bottom', 'end').as('pill').show() //show pill shaped toast
          router.push("/admin/campus");
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
            <Form.Title title="Edit Campus Page">
              <Form.Button />
            </Form.Title>
            <Form.Section title={"Page Details"}>
              <Form.TextInput
                {...formik.getFieldProps("title")}
                label="Page Name"
              />
              <Form.TextInput
                {...formik.getFieldProps("cover")}
                label="Cover Image Link"
              />
            </Form.Section>
            <Form.Section title={"Description"}>
              <Form.TextArea
                {...formik.getFieldProps("about")}
                label="Page Description"
              />
            </Form.Section>
            <Form.Section title={"Staffs"}>
              {staffIds?.map((staffId) => {
                return (
                  <DynamicUserCard
                    key={staffId}
                    staffId={staffId}
                    onClick={() => {
                      setStaffIds(staffIds.filter((id) => id !== staffId));
                    }}
                  />
                );
              })}
              <DynamicUserCard.NewButton onClick={() => setShowModal(true)} />
            </Form.Section>
          </Form>
        </div>
      </div>
      <Modal
        show={showModal}
        title={"Search user to add into page"}
        onClose={() => {
          setSelectedUser(null);
          setShowModal(false);
        }}
        onConfirm={() => {
          if (selectedUser) {
            setStaffIds([...staffIds, selectedUser]);
          }
          setSelectedUser(null);
          setShowModal(false);
        }}
      >
        <UserSelect
          onChange={(e) => {
            setSelectedUser(e.value);
          }}
        />
      </Modal>
    </>
  );
}

EditDetails.layout = Admin;
