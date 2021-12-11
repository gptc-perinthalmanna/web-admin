import React from "react";
import Select from "react-select";
import { fetchData } from "helpers/fetcher";

function UserSelect({onChange, value, ...props}) {
  const { data } = fetchData("/api/admin/users/all");
  return (
    <Select
      options={data? data.map((user) => ({ value: user.key, label: user.name })) : []}
      onChange={onChange}
      value={value}
    />
  );
}

export default UserSelect;
