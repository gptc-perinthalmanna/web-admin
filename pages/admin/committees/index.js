import React from "react";
import { useRouter } from "next/router";

import Admin from "layouts/Admin.js";
import { fetchData } from "helpers/fetcher";
import CommitteeItem from "components/Page/CommitteeItem";
import PageTitle from "components/Ui/PageTitle";
import Button from "components/Ui/Button";

export default function Dashboard() {
  const router = useRouter();
  const { data, error } = fetchData("/api/admin/custom/committees/all");
  return (
    <>
      <PageTitle>Committiees</PageTitle>
      <div className="flex justify-end w-full">
        <Button onClick={() => router.push("/admin/committees/new")}>
          <i className="fas fa-plus" /> Create New Committee
        </Button>
      </div>
      <div className="flex flex-wrap">
        {!data && !error && <CommitteeItem.Loading />}
        {data &&
          data.map((facility) => (
            <CommitteeItem
              key={facility.title}
              {...facility}
              onEdit={() =>
                router.push(`/admin/committees/edit/${encodeURIComponent(facility.title)}`)
              }
            />
          ))}
      </div>
    </>
  );
}

Dashboard.layout = Admin;

