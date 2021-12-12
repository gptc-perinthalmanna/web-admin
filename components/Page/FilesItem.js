import ClickAndEditBtn from "components/Ui/ClickAndEditBtn";
import DecoratedText from "components/Ui/DecoratedText";
import React from "react";

function FilesItem({ title, description, url, tags, onEdit, onDelete }) {
  return (
    <div className="w-full p-3 xl:w-1/2">
    <div className="flex m-2 overflow-hidden bg-white border-transparent rounded-lg shadow-lg">
      <div className="flex flex-col flex-grow p-5 text-gray-700 bg-teal-50">
        <div className="flex justify-between">
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <div className="flex-grow">
          <p className="text-sm">{description}</p>
        </div>
        <div className="flex-grow-0">
          <DecoratedText title="File Link" text={url} className="overflow-hidden truncate" />
        </div>
        <div className="flex">
          <div className="flex flex-wrap flex-grow text-xs">
            <p>
              Tags :
              {tags.map((tag, index) => (
                <span
                  key={tag}
                  className="inline-block px-2 py-1 mx-1 text-xs font-semibold text-orange-600 uppercase bg-orange-200 rounded last:mr-0"
                >
                  {tag}
                </span>
              ))}
            </p>
          </div>
          <div className="flex-shrink-0">
            <ClickAndEditBtn onDelete={onDelete} onEdit={onEdit} />
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default FilesItem;

function Loading() {
  return (
    <>
      <div className="w-full p-3 xl:w-1/2">
        <div className="flex items-center justify-center h-40 my-2 overflow-hidden text-xl ease-in-out bg-gray-300 border-transparent rounded-lg shadow-lg animate-pulse">
          {/* <p><i className="mr-3 fas fa-spinner animate-spin" />Loading...</p> */}
        </div>
      </div>
      <div className="w-full p-3 xl:w-1/2">
        <div className="flex items-center justify-center h-40 my-2 overflow-hidden text-xl ease-in-out bg-gray-300 border-transparent rounded-lg shadow-lg animate-pulse">
          {/* <p><i className="mr-3 fas fa-spinner animate-spin" />Loading...</p> */}
        </div>
      </div>
    </>
  );
}

FilesItem.Loading = Loading;
