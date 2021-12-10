import React from "react";
import Admin from "layouts/Admin.js";
import { fetchData } from "helpers/fetcher";
import FacilityItem from "components/Page/FacilityItem";
import PageTitle from "components/Ui/PageTitle";

export default function Dashboard() {
  fetchData("/api/events");
  return (
    <>
     <PageTitle>Campus</PageTitle>
      <div className="flex flex-wrap">
        <div className="w-full p-3 xl:w-1/2">
          <FacilityItem
            title="Boomithraseena Club"
            description="Climate change poses an emerging challenge to the sustainability of social and economic development, livelihoods, and environmental management across the globe. The rise in Green House Gases (GHGs) in the atmosphere causes a rise in temperature which in turn leads to unpredictable weather including flash floods and drought, and a rise in sea level. So far as India is considered, the country is highly vulnerable to climate change because of high physical exposure to climate-related disasters (65% is drought-prone, 12% is flood-prone, 8% susceptible to cyclones) and also India’ economy and population depend on climate-sensitive sectors like agriculture, forests, tourism and fisheries.  The Kerala State Action Plan on Climate Change developed by the Department of Environment and Climate Change, the Government of Kerala aims to address the negative consequences of climate change and thus reduce the risk associated with it. It also envisaged climate change strategies need to be integrated development planning process in the state Vision Placing the climate change concerns at the forefront of sustainable development and for maintaining the quality of life of the people of the State Mission."
            coverImageUri="https://i.ibb.co/ZWfQcvf/greivance-redressal-committee.jpg"
            users={[
              { name: "Amjed Ali", description: "Faculty" },
              { name: "Sajid Ali", description: "Faculty" },
            ]}
            onEdit={() => {}}
            onDelete={() => {}}
          />
        </div>
      </div>
    </>
  );
}

Dashboard.layout = Admin;
