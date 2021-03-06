import React from "react";
import Admin from "layouts/Admin.js";
import { fetchData } from "helpers/fetcher";
import ImageItem from "components/Page/ImageItem";

export default function Dashboard() {
  fetchData("/api/events");
  return (
    <>

      <div className="flex flex-wrap">
        <div className="w-full p-3 xl:w-1/2">
          <ImageItem />
        </div>
      </div>
    </>
  );
}

Dashboard.layout = Admin;
