import React from "react";
import Image from "next/image";
import Admin from "layouts/Admin.js";
import { fetchData } from "helpers/fetcher";

export default function Dashboard() {
  fetchData("/api/events");
  return (
    <>

      <div className="flex flex-wrap">
        <div className="w-full p-3 xl:w-1/2">
          <div className="flex overflow-hidden bg-white border-transparent rounded-lg shadow-lg">
            <div className="relative w-full h-96">
              <Image
                src="/img/team-3-800x800.jpg"
                alt="team-3"
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute bottom-0 w-full">
                <div className="flex flex-col p-5 text-gray-700 bg-teal-50 bg-opacity-40">
                  <div className="flex justify-between">
                    <h3 className="text-xl font-bold">cover-girl.jpg</h3>
                    <h3 className="font-bold">12-8-2021</h3>
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm">
                      File
                    </p>
                  </div>
                  <div className="flex">
                    <div className="flex flex-wrap flex-grow">
                     
                    </div>
                    <div className="flex-shrink-0">
                     
                      <a className="px-2 mr-2 text-gray-100 bg-red-500 rounded-md shadow-md cursor-pointer hover:text-red-700 ">
                        <i className="mr-2 fa fa-times" />Delete
                      </a>
                    </div>
                  </div>
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
