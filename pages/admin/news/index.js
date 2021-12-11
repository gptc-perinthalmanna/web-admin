import React from "react";
import Admin from "layouts/Admin.js";
import { fetchData } from "helpers/fetcher";
import NewsItem from "../../../components/Page/NewsItem";

export default function Dashboard() {
  const { data, error } = fetchData("/api/admin/news/all");
  return (
    <>
      <h2 className="mt-4 text-2xl font-bold text-gray-800">Dashboard</h2>
      <div className="flex flex-wrap">
      {!data && !error && <NewsItem.Loading />}
        {data &&
          data.map((event) => (
            <NewsItem {...event} onDelete={() => {}} onEdit={() => {}} />
          ))}
      </div>
    </>
  );
}

Dashboard.layout = Admin;
