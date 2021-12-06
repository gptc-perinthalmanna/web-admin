import React from "react";
import Admin from "layouts/Admin.js";
import { fetchData } from "helpers/fetcher";

export default function Dashboard() {
  fetchData("/api/events");
  return (
    <>
      <h2 className="mt-4 text-2xl font-bold text-gray-800">Dashboard</h2>
      <div className="flex flex-wrap">
        <div className="w-full p-3 xl:w-1/2">
          <div className="flex overflow-hidden bg-white border-transparent rounded-lg shadow-lg">
            <div className="flex flex-col flex-grow p-5 text-gray-700 bg-teal-50">
              <div className="flex justify-between">
                <h3 className="text-xl font-bold">Total Events</h3>
                <h3 className="font-bold">12-8-2021</h3>
              </div>
              <div className="flex-grow pb-2">
                <p className="text-sm">
                  Lorem ipsum doer aodf isdoafi oisdfj odsfjoiaeoih oian
                  joisdnoi jadsoifoi j eoiejoi fjoijadsoi joia sjdfoiajoi
                  jsoidjfaoia ja
                </p>
              </div>
              <div className="flex">
                <div className="flex flex-wrap flex-grow">
                  <span className="inline-block px-2 py-1 mr-1 text-xs font-semibold text-red-600 uppercase bg-red-200 rounded last:mr-0">
                    <i className="mr-1 fas fa-user" /> Amjed Ali
                  </span>
                </div>
                <div className="flex-shrink-0">
                  <a className="pr-1 mr-1 border-r-2 border-gray-500 cursor-pointer hover:text-blue-700 ">
                    Edit
                  </a>
                  <a className="mr-2 cursor-pointer hover:text-red-700 ">
                    Delete
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Dashboard.layout = Admin;
