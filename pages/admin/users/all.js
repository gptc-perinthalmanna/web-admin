import React from "react";
import Admin from "layouts/Admin.js";
import { fetchData } from "helpers/fetcher";
import UserCard from "components/Ui/UserCard";

export default function Dashboard() {
  const { data, error } = fetchData("/api/admin/users/all");
  return (
    <>
      <div className="flex flex-wrap">
      {!data && !error && <UserCard.Loading />}
        {data &&
          data.map((user) => (
          <UserCard {...user} key={user.key} />
          ))}
      </div>
    </>
  );
}

Dashboard.layout = Admin;
