import React from "react";
import ClickAndEditBtn from "./ClickAndEditBtn";

function UserCard({
  name,
  phone,
  key,
  designation,
  department,
  socialLinks,
  onEdit,
  onDelete,
}) {
  return (
    <div className="w-full p-3 xl:w-1/2">
      <div className="p-3 border-2 rounded-md bg-rose-50 border-rose-500">
        <div className="flex">
          <div className="flex-grow">
            <h3 className="text-xl font-bold text-rose-800">{name}</h3>
            <h5 className="text-gray-600">
              {designation}, {department}
            </h5>
            <p className="text-xs text-rose-400">{key}</p>
            <div className="flex my-2 text-gray-600">
              {phone && phone.length > 0 && (
                <i className="mr-2 fas fa-phone-alt"></i>
              )}
              {socialLinks && socialLinks.facebook && <i className="mr-2 fab fa-facebook"></i>}
              {socialLinks && socialLinks.linkedin && <i className="mr-2 fab fa-linkedin"></i>}
              {socialLinks && socialLinks.instagram && (
                <i className="mr-2 fab fa-instagram"></i>
              )}
            </div>
          </div>
          <div>
            <ClickAndEditBtn onDelete={onDelete} onEdit={onEdit} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;

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

UserCard.Loading = Loading;
