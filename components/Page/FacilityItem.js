import React from "react";
import { ErrorBoundary } from "react-error-boundary";

import ClickAndEditBtn from "components/Ui/ClickAndEditBtn";
import DecoratedText from "components/Ui/DecoratedText";
import MinimalUserCard from "components/Ui/MinimalUserCard";
function FacilityItem({
  title,
  description,
  coverImageUri,
  users,
  onEdit,
  onDelete,
}) {
  return (
    <ErrorBoundary
    FallbackComponent={ErrorFallback}
    onReset={() => {
      // reset the state of your app so the error doesn't happen again
    }}
  >
    <div className="w-full p-3 xl:w-1/2">
    <div className="flex my-2 overflow-hidden bg-white border-transparent rounded-lg shadow-lg">
      <div className="flex flex-col flex-grow p-5 text-gray-700 bg-teal-50">
        <div className="flex justify-between">
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <div className="flex-grow">
          <p className="text-sm">{description}</p>
        </div>
        {coverImageUri && <div className="flex-grow-0">
          <DecoratedText title="Cover Image Link" text={coverImageUri} />
        </div>}
        <div className="flex">
          <div className="flex flex-wrap flex-grow text-xs">
            {/* USER Card  */}
            {users.map((user) => (
              <MinimalUserCard
                key={user.name}
                name={user.name}
                description={user.description}
              />
            ))}
          </div>
          <div className="flex-shrink-0 mt-auto">
            <ClickAndEditBtn onEdit={onEdit} />
          </div>
        </div>
      </div>
    </div></div></ErrorBoundary>
  );
}

export default FacilityItem;



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

FacilityItem.Loading = Loading;



function ErrorFallback() {
  return (
    <>
    <div className="w-full p-3 xl:w-1/2">
    <div className="flex items-center justify-center h-40 my-2 overflow-hidden text-xl ease-in-out bg-gray-300 border-transparent rounded-lg shadow-lg animate-pulse">
      <p><i className="mr-3 text-red-700 fas fa-exclamation-triangle animate-pulse" />An error occured...</p>
      </div>
    </div>
    </>
 
  )
}

FacilityItem.ErrorFallback = ErrorFallback;