import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import useUser from "lib/useUser";

import Admin from "layouts/Admin.js";
import { fetchData } from "helpers/fetcher";
import EventItem from "components/Page/EventItem";
import PageTitle from "components/Ui/PageTitle";
import Button from "components/Ui/Button";

export default function Dashboard() {
  const { data, error } = fetchData("/api/admin/events/all");
  const router = useRouter();
  const { user } = useUser();
  const deleteEvent = async (id) => {
    const res = await axios.post("/api/admin/events/delete", {
      key: id,
    });
    if (res.data.error) {
      console.log(res.data.error);
    }
    router.reload();
  };

  return (
    <>
      <PageTitle>Events</PageTitle>
      <div className="flex justify-end w-full">
        <Button onClick={() => router.push("/admin/events/new")}>
          <i className="fas fa-plus" /> Create New Event
        </Button>
      </div>
      <div className="flex flex-wrap">
        {!data && !error && <EventItem.Loading />}
        {data &&
          data.map((event) => (
            <EventItem
              {...event}
              onDelete={
                user?.role.includes("admin")
                  ? () => {
                      deleteEvent(event.key);
                    }
                  : null
              }
            />
          ))}
      </div>
    </>
  );
}

Dashboard.layout = Admin;
