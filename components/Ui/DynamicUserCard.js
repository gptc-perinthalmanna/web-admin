import React from "react";
import { fetchData } from "helpers/fetcher";

function DynamicUserCard({ staffId, description, onClick }) {
  const { data } = fetchData("/api/admin/users/" + staffId);
  const des = description ? description : data.designation 
  return (
    <div className="relative flex p-2 pr-3 m-2 bg-gray-200 border-2 rounded-md">
      {onClick && (
        <div
          onClick={onClick}
          className="absolute px-2 py-1 text-xs text-white rounded-full cursor-pointer hover:bg-rose-500 -top-2 -right-2 bg-rose-600"
        >
          <i className="fas fa-times" />
        </div>
      )}
      <i className="mr-3 text-2xl text-gray-600 fas fa-user-circle"></i>
      <div>
        <h3 className="font-bold">{data ? data.name : "Loading..."}</h3>
        <p className="text-xs capitalize">{des}</p>
      </div>
    </div>
  );
}

export default DynamicUserCard;

function NewButton({ onClick }) {
  return (
    <div className="relative flex items-center justify-center p-2 m-2 transition-all duration-200 bg-gray-200 border-2 rounded-md cursor-pointer hover:bg-gray-100" onClick={onClick}>
      <i className="mx-2 text-2xl text-gray-600 fas fa-plus"></i>
    </div>
  );
}

DynamicUserCard.NewButton = NewButton;  
