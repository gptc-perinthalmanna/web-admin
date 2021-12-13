import React, { useState } from "react";
import Select from "react-select";
import axios from "axios";
import { toast } from "tailwind-toast";

import Form from "components/Forms/Form";
import Admin from "layouts/Admin.js";
import { fetchData } from "helpers/fetcher";
import PageTitle from "components/Ui/PageTitle";
import EventItem from "components/Page/EventItem";

export default function Dashboard() {
  const [selectedEventId, setSelectedEventId] = useState(null);
  const event = fetchData("/api/public/events/highlighted");
  const allEvents = fetchData("/api/admin/events/all");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    selectedEventId &&
      axios
        .post("/api/admin/custom/highlightedEvent/set", {
          event_id: selectedEventId.value,
        })
        .then(() => {
          setLoading(false);
          toast()
            .success("Great!", "Updated Highlighted event!")
            .with({ color: "bg-green-800" })
            .from("bottom", "end")
            .as("pill")
            .show(); //show pill shaped toast
        })
        .catch(() => {
          setLoading(false);
          toast()
            .success("Great!", "An error occured!")
            .with({ color: "bg-red-800" })
            .from("bottom", "end")
            .as("pill")
            .show(); //show pill shaped toast
        });
  };

  return (
    <>
      <PageTitle>Highlighted Event</PageTitle>
      <div className="flex flex-wrap">
        {!event?.data && !event?.error && <EventItem.Loading />}
        {event?.data && <EventItem {...event.data} />}
      </div>
      <PageTitle>Edit Event</PageTitle>
      <div className="flex flex-col items-center justify-start p-3 m-3 border-2 lg:flex-row">
      
          <Form.Section>
            <div className="w-full lg:w-1/2">

            
            {allEvents?.data && (
              <Select
                options={
                  allEvents?.data
                    ? allEvents?.data?.map((e) => ({
                        value: e.key,
                        label: e.title,
                      }))
                    : []
                }
                onChange={(e) => setSelectedEventId(e)}
                value={selectedEventId}
              />
            )}
            </div>
          </Form.Section>
          <Form.Button
            title={loading ? "Loading..." : "Update"}
            onClick={onSubmit}
            disabled={loading}
            className="w-1/5 h-12"
          />
      
      </div>
    </>
  );
}

Dashboard.layout = Admin;
