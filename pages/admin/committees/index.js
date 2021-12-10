import React from "react";
import Admin from "layouts/Admin.js";
import { fetchData } from "helpers/fetcher";
import FacilityItem from "components/Page/FacilityItem";
import PageTitle from "components/Ui/PageTitle";

export default function Dashboard() {
  fetchData("/api/events");
  return (
    <>
     <PageTitle>Committiees</PageTitle>
      <div className="flex flex-wrap">
        <div className="w-full p-3 xl:w-1/2">
          <FacilityItem
            title="Innovation Cell/Club"
            description="Electronic engineering, or electronics engineering is a form of engineering associated with electronic circuits, devices and the equipment and systems that use them.Electronic engineering utilises a variety of different types of electronic components from the more traditional analogue components through to digital electronic components, microprocessors and microcontrollers as well as programmable logic devices. This means that electronic engineering can incorporate a large variety of different areas.The field of electronic engineering includes a variety more specific electronic engineering fields including: analogue electronics, digital electronics, consumer electronics, embedded systems and power electronics."
            users={[
              { name: "Amjed Ali", description: "Faculty" },
              { name: "Sajid Ali", description: "Faculty" },
            ]}
            onEdit={() => {}}   
          />
        </div>
      </div>
    </>
  );
}

Dashboard.layout = Admin;
