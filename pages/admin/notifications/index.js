import React from "react";
import Image from "next/image";
import Admin from "layouts/Admin.js";
import { fetchData } from "helpers/fetcher";
import PageTitle from "components/Ui/PageTitle";
import EventItem from "../../../components/Page/EventItem";

export default function Dashboard() {
  const { data, error } = fetchData("/api/admin/notifications/all");
  return (
    <>
    <PageTitle>Notifications</PageTitle>
      <div className="flex flex-wrap">
      {!data && !error && <EventItem.Loading />}
        {data &&
          data.map((event) => (
            <EventItem {...event} onDelete={() => {}} onEdit={() => {}} />
          ))}
      </div>
    </>
  );
}

Dashboard.layout = Admin;
