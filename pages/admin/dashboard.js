import React from "react";

// components

import CardMenu from "components/Cards/CardMenu.js";

// layout for page

import Admin from "layouts/Admin.js";
import { menu } from "constants/menu";

export default function Dashboard() {
  return (
    <>
    <h2 className="text-2xl font-bold text-white">Dashboard</h2>
      <div className="flex flex-wrap">
        {
          menu.map((item, index) => (
            item.items.map((subItem, subIndex) => (
              <CardMenu
                key={`${index}-${subIndex}`}
                statTitle={subItem.title}
                statIconName={subItem.icon}
                statLink={subItem.link}
                statSubtitle={item.title}
              />
            ))
          ))
        }
     
      </div>
    </>
  );
}

Dashboard.layout = Admin;
