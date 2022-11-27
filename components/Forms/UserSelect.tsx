import React, { useState } from "react";
import Select from "react-select";
import { fetchData } from "helpers/fetcher";
import { UserType } from "server/db";

type ValueType = {
  value: string;
  label: string;
  index: number;
};

function UserSelect({ onChange, type = "staff", ...props }) {
  const { data } = fetchData<UserType[]>(
    `/api/admin/users/all${type && `?role=${type}`}`
  );
  const [_value, setValue] = useState<ValueType>();
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
      onChange={(e: ValueType) => {
        onChange(e, data[e.index]);
        setValue(e);
      }}
      className="transition-all duration-150 ease-linear bg-white rounded shadow  outline-none !border-0"
      value={_value}
    />
  );
}

export default UserSelect;
