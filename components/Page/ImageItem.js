import React from "react";
import Image from "next/image";
function ImageItem({ ...image }) {
  return (
    <div className="w-full p-3 xl:w-1/2">
      <div className="flex overflow-hidden bg-white border-transparent rounded-lg shadow-lg">
        <div className="relative w-full h-96">
          <Image
            src={image.url}
            alt={image.title}
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute bottom-0 w-full">
            <div className="flex flex-col p-5 text-gray-700 bg-teal-50 bg-opacity-40">
              <div className="flex justify-between">
                <h3 className="text-xl font-bold">{image.image.filename}</h3>
                <h3 className="font-bold">{new Date(parseInt(image.time) * 1000).toGMTString()}</h3>
              </div>
              <div className="flex-grow">
                <p className="text-sm">{image.title}</p>
              </div>
              <div className="flex">
                <div className="flex flex-wrap flex-grow"></div>
                <div className="flex-shrink-0">
                  <a className="px-2 mr-2 text-gray-100 bg-red-500 rounded-md shadow-md cursor-pointer hover:text-red-700 ">
                    <i className="mr-2 fa fa-times" />
                    Delete
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageItem;

function Loading() {
  return (
    <>
      <div className="w-full p-3 xl:w-1/2">
        <div className="flex items-center justify-center h-48 my-2 overflow-hidden text-xl ease-in-out bg-gray-300 border-transparent rounded-lg shadow-lg animate-pulse">
          {/* <p><i className="mr-3 fas fa-spinner animate-spin" />Loading...</p> */}
        </div>
      </div>
      <div className="w-full p-3 xl:w-1/2">
        <div className="flex items-center justify-center h-48 my-2 overflow-hidden text-xl ease-in-out bg-gray-300 border-transparent rounded-lg shadow-lg animate-pulse">
          {/* <p><i className="mr-3 fas fa-spinner animate-spin" />Loading...</p> */}
        </div>
      </div>
    </>
  );
}

ImageItem.Loading = Loading;
