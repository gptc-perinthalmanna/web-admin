import React from "react";
import Image from "next/image";
import axios from "axios";
import { useSWRConfig } from "swr";
import { toastSuccess } from "components/toast";

function ImageItem(image) {
  const { mutate } = useSWRConfig();

  const deleteImage = async () => {
    const res = await axios.post<{ error?: string }>(
      "/api/admin/images/delete",
      {
        key: image.id,
      }
    );
    if (res.data.error) {
      console.log(res.data.error);
    }
    mutate("/api/admin/images/all");
    toastSuccess("Image successfully deleted!");
  };

  return (
    <div className="w-full p-3 max-w-xs">
      <div className="flex overflow-hidden max-w-xs bg-white border-transparent rounded-lg shadow-lg">
        <div className="relative w-full max-w-xs h-64">
          <Image
            src={image.url}
            alt={image.title}
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute bottom-0 w-full text-sm">
            <div className="flex justify-between items-center p-5 text-gray-700 bg-teal-50 bg-opacity-40">
              <div className="flex flex-col justify-between">
                <h3 className="text-sm font-bold">{image.image.filename}</h3>
                <h3 className="text-xs">
                  {new Date(parseInt(image.time) * 1000).toLocaleString()}
                </h3>
              </div>
              <div className="flex">
                <div className="flex flex-wrap flex-grow"></div>
                <div className="flex-shrink-0">
                  <button
                    onClick={deleteImage}
                    className="p-2 px-4 mr-2 text-gray-100 bg-red-500 rounded-md shadow-md cursor-pointer duration-300 hover:bg-red-700 "
                  >
                    <i className="fa fa-trash" />
                  </button>
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
