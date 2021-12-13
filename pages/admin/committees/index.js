import React from "react";
import Admin from "layouts/Admin.js";
import { fetchData } from "helpers/fetcher";
import FacilityItem from "components/Page/FacilityItem";
import PageTitle from "components/Ui/PageTitle";

export default function Dashboard() {
  const { data, error } = fetchData("/api/admin/custom/committees/all");
  // console.log(data)
  return (
    <>
     <PageTitle>Committiees</PageTitle>
      <div className="flex flex-wrap">
      {!data && !error && <FacilityItem.Loading />}
        {data &&
          data.map((facility) => (
            <CommitteItem
              key={facility.title}
             {...facility}
              onEdit={() => router.push(`/admin/committees/edit/${facility.title}`)}
            />
          ))}
      </div>
    </>
  );
}

Dashboard.layout = Admin;


function CommitteItem({ title, staffs_ids, ...props }) {
  let staffs = {}
  staffs_ids?.forEach((e) => {
    const {data} = fetchData(`/api/admin/users/${e.key}`)
    staffs[e.key] = data
  });

  return (
    <FacilityItem
    key={title}
    title={title}
    users={staffs_ids.map((staff) => ({
      name: staffs[staff.key] ? staffs[staff.key].name : staff.key,
      description: staff?.position,
    }))}
    {...props}
  />
  )
}
