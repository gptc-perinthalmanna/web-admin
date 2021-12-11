import Image from "next/image";
import React from "react";

import ClickAndEditBtn from "components/Ui/ClickAndEditBtn";

function EventItem({ title, subtitle, date, image, tags, onEdit, onDelete }) {
  return (
    <div className="w-full p-3 xl:w-1/2">
      <div className="flex overflow-hidden bg-white border-transparent rounded-lg shadow-lg">
       {image && <div className="relative w-56 h-56">
          <Image src={image} alt="team-3" layout="fill" objectFit="cover" />
        </div>}
        <div className="flex flex-col flex-grow p-5 text-gray-700 bg-teal-50">
          <div className="flex justify-between">
            <h3 className="text-xl font-bold">{title}</h3>
           {date && <h3 className="font-bold">{date}</h3>}
          </div>
          <div className="flex-grow">
          {subtitle && <p className="text-sm">{subtitle}</p>}
          </div>
          <div className="flex">
            <div className="flex flex-wrap flex-grow">
              {tags?.map((tag, index) => (
                <span
                  key={tag}
                  className="inline-block px-2 py-1 mr-1 text-xs font-semibold text-teal-600 uppercase bg-blue-200 rounded last:mr-0"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex-shrink-0">
            <ClickAndEditBtn onEdit={onEdit} onDelete={onDelete} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventItem;



function Loading() {
  return (
    <>
    <div className="w-full p-3 xl:w-1/2">
    <div className="flex items-center justify-center h-40 my-2 overflow-hidden text-xl ease-in-out bg-gray-300 border-transparent rounded-lg shadow-lg animate-pulse">
      {/* <p><i className="mr-3 fas fa-spinner animate-spin" />Loading...</p> */}
      </div>
    </div><div className="w-full p-3 xl:w-1/2">
    <div className="flex items-center justify-center h-40 my-2 overflow-hidden text-xl ease-in-out bg-gray-300 border-transparent rounded-lg shadow-lg animate-pulse">
      {/* <p><i className="mr-3 fas fa-spinner animate-spin" />Loading...</p> */}
      </div>
    </div>
    </>
 
  )
}

EventItem.Loading = Loading;