import React from "react";
import { useRouter } from "next/router";

import Admin from "layouts/Admin.js";
import { fetchData } from "helpers/fetcher";
import FilesItem from "components/Page/FilesItem";
import PageTitle from "components/Ui/PageTitle";
import Button from "components/Ui/Button";

export default function Dashboard() {
  const { data, error } = fetchData("/api/admin/files/all");
  const router = useRouter();
  const deleteEvent = async (id) => {
    const res = await axios.post("/api/admin/files/delete", {
      key: id,
    });
    if (res.error) {
      console.log(res.error);
    }
    router.reload();
  };

  return (
    <>
      <PageTitle>Files and Documents</PageTitle>
      <div className="flex justify-end w-full">
        <Button onClick={() => router.push("/admin/files/new")}>
          <i className="fas fa-plus" /> Create New File Post
        </Button>
      </div>
      <div className="flex flex-wrap">
      {!data && !error && <FilesItem.Loading />}
        {data &&
          data.map((event) => (
            <FilesItem {...event}  onDelete={() => {
                deleteEvent(event.key);
              }} />
          ))}
      </div>
    </>
  );
}

Dashboard.layout = Admin;
