import React from "react";
import { useRouter } from 'next/router'

import Admin from "layouts/Admin.js";
import { fetchData } from "helpers/fetcher";
import FacilityItem from "components/Page/FacilityItem";
import PageTitle from "components/Ui/PageTitle";

export default function Dashboard() {
  const { data, error } = fetchData("/api/admin/dept-facility/all");
  const router = useRouter();
  return (
    <>
      <PageTitle>Facilities under Each Dept</PageTitle>
      <div className="flex flex-wrap">
        {!data && !error && <FacilityItem.Loading />}
        {data &&
          data.map((facility) => (
            <FacilityItem
              key={facility.key}
              title={facility.title}
              description={facility.description}
              coverImageUri={facility.image}
              onEdit={() => router.push(`/admin/dept-facility/edit/${facility.key}`)}
            />
          ))}
      </div>
    </>
  );
}

Dashboard.layout = Admin;
