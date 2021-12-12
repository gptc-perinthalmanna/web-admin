import React from "react";
import { useRouter } from "next/router";
import axios from "axios";

import Admin from "layouts/Admin.js";
import { fetchData } from "helpers/fetcher";
import PageTitle from "components/Ui/PageTitle";
import Button from "components/Ui/Button";
import NewsItem from "components/Page/NewsItem";

export default function Dashboard() {
  const { data, error } = fetchData("/api/admin/news/all");
  const router = useRouter();
  const deleteEvent = async (id) => {
    const res = await axios.post("/api/admin/news/delete", {
      key: id,
    });
    if (res.error) {
      console.log(res.error);
    }
    router.reload();
  };
  return (
    <>
      <PageTitle>News</PageTitle>
      <div className="flex justify-end w-full">
        <Button onClick={() => router.push("/admin/news/new")}>
          <i className="fas fa-plus" /> Create News & Media Post
        </Button>
      </div>
      <div className="flex flex-wrap">
      {!data && !error && <NewsItem.Loading />}
        {data &&
          data.map((event) => (
            <NewsItem {...event}  onDelete={() => {
              deleteEvent(event.key);
            }} />
          ))}
      </div>
    </>
  );
}

Dashboard.layout = Admin;
