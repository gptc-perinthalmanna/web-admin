import React from "react";
import axios from "axios";
import { useRouter } from "next/router";

import Admin from "layouts/Admin.js";
import { fetchData } from "helpers/fetcher";
import PageTitle from "components/Ui/PageTitle";
import EventItem from "components/Page/EventItem";
import Button from "components/Ui/Button";

export default function Dashboard() {
  const { data, error } = fetchData("/api/admin/notifications/all");
  const router = useRouter();

  const deleteNotification = async (id) => {
    const res = await axios.post("/api/admin/notifications/delete", {
      key: id,
    });
    if (res.error) {
      console.log(res.error);
    }
    router.reload();
  };

  return (
    <>
      <PageTitle>Notifications</PageTitle>
      <div className="flex justify-end w-full">
        <Button onClick={() => router.push("/admin/notifications/new")}>
          <i className="fas fa-plus" /> Create New Notification
        </Button>
      </div>
      <div className="flex flex-wrap">
        {!data && !error && <EventItem.Loading />}
        {data &&
          data.map((event) => (
            <EventItem
              {...event}
              onDelete={() => {
                deleteNotification(event.key);
              }}
              onEdit={() => {router.push(`/admin/notifications/edit/${event.key}`)}}
            />
          ))}
      </div>
    </>
  );
}

Dashboard.layout = Admin;
