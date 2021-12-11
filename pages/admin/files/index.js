import React from "react";
import Admin from "layouts/Admin.js";
import { fetchData } from "helpers/fetcher";
import FilesItem from "components/Page/FilesItem";
import PageTitle from "components/Ui/PageTitle";

export default function Dashboard() {
  const { data, error } = fetchData("/api/admin/files/all");
  return (
    <>
      <PageTitle>Files and Documents</PageTitle>
      <div className="flex flex-wrap">
      {!data && !error && <FilesItem.Loading />}
        {data &&
          data.map((event) => (
            <FilesItem {...event} onDelete={() => {}} onEdit={() => {}} />
          ))}
      </div>
    </>
  );
}

Dashboard.layout = Admin;
