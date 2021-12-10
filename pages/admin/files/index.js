import React from "react";
import Image from "next/image";
import Admin from "layouts/Admin.js";
import { fetchData } from "helpers/fetcher";
import FilesItem from "components/Page/FilesItem";
import PageTitle from "components/Ui/PageTitle";

export default function Dashboard() {
  fetchData("/api/events");
  return (
    <>
      <PageTitle>Files and Documents</PageTitle>
      <div className="flex flex-wrap">
        <div className="w-full p-3 xl:w-1/2">
          <FilesItem
            title="EOA-2021.pdf"
            description="EOA-2021.pdf"
            link="/admin/files/EOA-2021.pdf"
            tags={["EOA", "2021"]}
            onDelete={() => {}}
            onEdit={() => {}}
          />
        </div>
      </div>
    </>
  );
}

Dashboard.layout = Admin;
