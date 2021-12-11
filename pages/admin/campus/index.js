import React from "react";
import Admin from "layouts/Admin.js";
import { fetchData } from "helpers/fetcher";
import FacilityItem from "components/Page/FacilityItem";
import PageTitle from "components/Ui/PageTitle";

export default function Dashboard() {
  const { data, error } = fetchData("/api/admin/campus/all");

  return (
    <>
      <PageTitle>Campus</PageTitle>
      <div className="flex flex-wrap">
        
      {!data && !error && <FacilityItem.Loading />}
          {data &&
            data.map((facility) => (
              <FacilityItem
                key={facility.key}
                title={facility.title}
                description={facility.about}
                coverImageUri={facility.cover}
                users={facility.staffs.map((staff) => ({
                  name: staff.name,
                  description: staff.department,
                }))}
                onEdit={() => {}}
                onDelete={() => {}}
              />
            ))}
        </div>
     
    </>
  );
}

Dashboard.layout = Admin;
