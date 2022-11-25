import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "tailwind-toast";

import Admin from "layouts/Admin.js";
import Form from "components/Forms/Form";
import { fetchData } from "helpers/fetcher";
import useUser from "lib/useUser";
import allRoles from "constants/roles";

export default function EditDetails() {
  const router = useRouter();
  const { user } = useUser();
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    if (!user) return;
    if (user.key !== router.query.id && !user.role.includes("admin")) {
      router.push("/admin/dashboard");
    }
  }, [user]);

  const { id } = router.query;
  const { data } = fetchData("/api/admin/users/" + id);

  useEffect(() => {
    if (!data) return;
    setRoles(data?.role?.map((role) => ({ label: role, value: role })));
  }, [data]);

  const formik = useFormik({
    initialValues: {
      name: data?.name,
      email: data?.email,
      designation: data?.designation,
      department: data?.department,
      phone: data?.phone,
      address: data?.address,
      facebook: data?.socialLinks?.facebook,
      linkedin: data?.socialLinks?.linkedin,
      instagram: data?.socialLinks?.instagram,
      whatsapp: data?.socialLinks?.whatsapp,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      designation: Yup.string().required(),
      department: Yup.string().required(),
      // role: Yup.array().of(Yup.string()),
      phone: Yup.string().min(10).required(),
      address: Yup.string().required(),

      facebook: Yup.string().url(),
      linkedin: Yup.string().url(),
      instagram: Yup.string().url(),
      whatsapp: Yup.string(),
    }),
    onSubmit: (values) => {
      axios
        .post("/api/admin/users/edit/", {
          ...values,
          socialLinks: {
            facebook: values?.facebook,
            linkedin: values?.linkedin,
            instagram: values?.instagram,
            whatsapp: values?.whatsapp,
          },
          key: data.key,
          role: roles.map((role) => role.value),
        })
        .then((res) => {
          toast()
            .success("Great!", "Updated the details!")
            .with({ color: "bg-blue-800" })
            .from("bottom", "end")
            .as("pill")
            .show(); //show pill shaped toast
          router.push("/admin/users/all");
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
          <EditForm
            formik={formik}
            user={user}
            roles={roles}
            setRoles={setRoles}
          />
        </div>
      </div>
    </>
  );
}

EditDetails.layout = Admin;

const EditForm = ({ formik, user, roles, setRoles }) => (
  <Form onSubmit={formik.handleSubmit}>
    <Form.Title title="Edit User Profile">
      <Form.Button />
    </Form.Title>
    <Form.Section title={"Basic Details"}>
      <Form.TextInput {...formik.getFieldProps("name")} label="Full Name" />
      {formik.touched.name && formik.errors.name ? (
        <Form.Error>{formik.errors.name}</Form.Error>
      ) : null}
      <Form.TextInput {...formik.getFieldProps("email")} label="Email" />
      {formik.touched.email && formik.errors.email ? (
        <Form.Error>{formik.errors.email}</Form.Error>
      ) : null}
      <Form.TextInput {...formik.getFieldProps("phone")} label="Phone Number" />
      {formik.touched.phone && formik.errors.phone ? (
        <Form.Error>{formik.errors.phone}</Form.Error>
      ) : null}
      <Form.TextInput {...formik.getFieldProps("address")} label="Address" />
      {formik.touched.address && formik.errors.address ? (
        <Form.Error>{formik.errors.address}</Form.Error>
      ) : null}
    </Form.Section>
    <Form.Section title={"Official Details"}>
      {roles.find((e) => e.label === "staff") && (
        <>
          <Form.TextInput
            {...formik.getFieldProps("designation")}
            label="Designation"
          />
          {formik.touched.designation && formik.errors.designation ? (
            <Form.Error>{formik.errors.designation}</Form.Error>
          ) : null}
        </>
      )}
      <Form.TextInput
        {...formik.getFieldProps("department")}
        label="Department"
      />
      {formik.touched.department && formik.errors.department ? (
        <Form.Error>{formik.errors.department}</Form.Error>
      ) : null}
      {user?.role?.includes("admin") && (
        <Form.TagsInput
          label="Tags"
          size="1/2"
          value={roles}
          onChange={(t) => setRoles(t)}
          options={allRoles.map((tag) => ({ label: tag, value: tag }))}
        />
      )}
    </Form.Section>
    <Form.Section title={"Social Media"}>
      <Form.TextInput
        {...formik.getFieldProps("facebook")}
        label="Facebook Link (Optional)"
      />
      {formik.touched.facebook && formik.errors.facebook ? (
        <Form.Error>{formik.errors.facebook}</Form.Error>
      ) : null}
      <Form.TextInput
        {...formik.getFieldProps("instagram")}
        label="Instagram Link (Optional)"
      />
      {formik.touched.instagram && formik.errors.instagram ? (
        <Form.Error>{formik.errors.instagram}</Form.Error>
      ) : null}
      <Form.TextInput
        {...formik.getFieldProps("linkedin")}
        label="LinkedIn Link (Optional)"
      />
      {formik.touched.linkedin && formik.errors.linkedin ? (
        <Form.Error>{formik.errors.linkedin}</Form.Error>
      ) : null}
    </Form.Section>
  </Form>
);
