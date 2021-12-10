import React from "react";
import Admin from "layouts/Admin.js";
import { fetchData } from "helpers/fetcher";
import FacilityItem from "components/Page/FacilityItem";
import PageTitle from "components/Ui/PageTitle";

export default function Dashboard() {
  fetchData("/api/events");
  return (
    <>
      <PageTitle>Facilities</PageTitle>
      <div className="flex flex-wrap">
        <div className="w-full p-3 xl:w-1/2">
          <FacilityItem
            title="Auditorium"
            description="There is a co-operative society with all the stationary items for the students and staff like note books,text books,drawing equipments,laboratory records etc are available through the society.College uniform cloths are also available.Every items are sold for a reasonable rate . All the staff and students are enrolled their name in the Society."
            coverImageUri="https://i.ibb.co/FWZb0zQ/87f4a817cf90.jpg"
            users={[
              { name: "Amjed Ali", description: "Faculty" },
              { name: "Sajid Ali", description: "Faculty" },
            ]}
            onEdit={() => {}}
            onDelete={() => {}}
          />
        </div>
      </div>
    </>
  );
}

Dashboard.layout = Admin;
