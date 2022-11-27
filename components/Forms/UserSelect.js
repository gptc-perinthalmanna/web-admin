import React, { useState } from "react";
import Select from "react-select";
import { fetchData } from "helpers/fetcher";

function UserSelect({ onChange, ...props }) {
  const { data } = fetchData("/api/admin/users/all");
  const [_value, setValue] = useState();
  console.log(_value);
  return (
    <Select
      options={
        data
          ? data.map((user, i) => ({
              value: user.key,
              label: user.name,
              index: i,
            }))
          : []
      }
      onChange={(e) => {
        onChange(e, user);
        setValue(e);
      }}
      value={_value}
    />
  );
}

export default UserSelect;
