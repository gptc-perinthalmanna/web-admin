import React from "react";

import { fetchData } from "helpers/fetcher";
import FacilityItem from "./FacilityItem";

export default function CommitteeItem({ title, staffs_ids, ...props }) {
  let staffs = {};
  staffs_ids?.forEach(async (e) => {
    const { data } = fetchData(`/api/admin/users/${e.key}`);
    staffs[e.key] = data;
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
  );
}

CommitteeItem.Loading = FacilityItem.Loading;
