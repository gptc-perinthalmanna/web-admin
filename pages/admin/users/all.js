import React from "react";
import { useRouter } from 'next/router'

import Admin from "layouts/Admin.js";
import { fetchData } from "helpers/fetcher";
import UserCard from "components/Ui/UserCard";

export default function Dashboard() {
  const { data, error } = fetchData("/api/admin/users/all");
  const router = useRouter();
  return (
    <>
      <div className="flex flex-wrap">
        {!data && !error && <UserCard.Loading />}
        {data &&
          data.map((user) => (
            <UserCard
              {...user}
              key={user.key}
              onEdit={() =>
                router.push(`/admin/users/edit/${user.key}`)
              }
            />
          ))}
      </div>
    </>
  );
}

Dashboard.layout = Admin;
