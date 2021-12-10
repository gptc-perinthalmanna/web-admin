import React from "react";
import Admin from "layouts/Admin.js";
import { fetchData } from "helpers/fetcher";
import UserCard from "components/Ui/UserCard";

export default function Dashboard() {
  fetchData("/api/events");
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full p-3 xl:w-1/2">
      <UserCard />
        </div>
      </div>
    </>
  );
}

Dashboard.layout = Admin;
