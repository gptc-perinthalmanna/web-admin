import React from "react";
import { useRouter } from "next/router";

import Admin from "layouts/Admin.js";
import { fetchData } from "helpers/fetcher";
import UserCard from "components/Ui/UserCard";

export default function Dashboard() {
  const { data, error } = fetchData("/api/admin/users/all");
  const router = useRouter();
  return (
    <>
      <h1 className="text-3xl font-bold my-4">All Staffs</h1>
      <div className="flex flex-wrap gap-4 my-4">
        {!data && !error && <UserCard.Loading />}
        {data &&
          data
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((user) => (
              <UserCard
                {...user}
                key={user.key}
                onEdit={() => router.push(`/admin/users/edit/${user.key}`)}
              />
            ))}
      </div>
    </>
  );
}

Dashboard.layout = Admin;
