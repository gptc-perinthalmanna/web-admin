import React from "react";
import Admin from "layouts/Admin";
import { fetchData } from "helpers/fetcher";
import ImageItem from "components/Page/ImageItem";
import { ImageType } from "server/db";

export default function Dashboard() {
  const { data, error } = fetchData<ImageType[]>("/api/admin/images/all");
  return (
    <>
      <div className="flex flex-wrap">
        {!data && !error && <ImageItem.Loading />}
        {data &&
          data.map((image) => (
            <ImageItem {...image} id={image.key} key={image.key} />
          ))}
      </div>
    </>
  );
}

Dashboard.layout = Admin;
