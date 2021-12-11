import React from "react";
import Admin from "layouts/Admin.js";
import { fetchData } from "helpers/fetcher";
import EventItem from "../../../components/Page/EventItem";
import PageTitle from "components/Ui/PageTitle";

export default function Dashboard() {
  const { data, error } = fetchData("/api/admin/events/all");
  return (
    <>
    <PageTitle>Events</PageTitle>
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
